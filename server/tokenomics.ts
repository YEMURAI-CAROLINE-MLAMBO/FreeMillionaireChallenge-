/**
 * Tokenomics service for the FreeMillionaireChallenge
 * 
 * This service manages the token distribution, fee calculation, and profit allocation
 * for the platform, working with the MetaMask wallet address.
 */

// Import shared types
import { Transaction } from "@shared/schema";
import { storage } from "./storage";

// Platform wallet address where all fees are collected
const DEFAULT_PLATFORM_WALLET = "0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330";

// Fee structure settings
const DEFAULT_SETTINGS = {
  // Founder profit percentage (30%)
  founderProfitPercentage: 30,
  
  // Platform fee for different transaction types (in BNB)
  fees: {
    adSubmission: 0.025, // 0.025 BNB per ad
    vote: 0.005,         // 0.005 BNB per vote
    progressUpdate: 0,    // Free for participants
    nftMinting: 0.01,     // 0.01 BNB per NFT mint
  },
  
  // Token distribution percentages (for future FMC token)
  tokenDistribution: {
    founder: 30,           // 30% for founder
    operations: 25,        // 25% for platform operations
    marketing: 15,         // 15% for marketing and growth
    participants: 15,      // 15% for participant incentives
    partners: 10,          // 10% for strategic partners
    publicSale: 5          // 5% for public token sale
  }
};

/**
 * Calculate fee breakdown for a specific transaction
 * 
 * @param amount Transaction amount in BNB
 * @param txType Transaction type
 * @returns Fee breakdown object with platform fee and founder profit
 */
export async function calculateFeeBreakdown(amount: number, txType: string): Promise<{
  totalAmount: number;
  platformFee: number;
  founderProfit: number;
  platformWallet: string;
}> {
  // Get founder profit percentage from settings or use default
  const founderProfitPercentageSetting = await storage.getSetting("founderProfitPercentage");
  const founderPercentage = founderProfitPercentageSetting 
    ? parseFloat(founderProfitPercentageSetting.value) 
    : DEFAULT_SETTINGS.founderProfitPercentage;

  // Get platform wallet address from settings or use default
  const platformWalletAddressSetting = await storage.getSetting("platformWalletAddress");
  const platformWallet = platformWalletAddressSetting?.value || DEFAULT_PLATFORM_WALLET;
  
  // Calculate founder profit (30% of total)
  const founderProfit = amount * (founderPercentage / 100);
  
  // Calculate platform fee (the remainder)
  const platformFee = amount - founderProfit;
  
  return {
    totalAmount: amount,
    platformFee,
    founderProfit,
    platformWallet
  };
}

/**
 * Get fee amount for a specific transaction type
 * 
 * @param txType Transaction type (adSubmission, vote, etc.)
 * @returns Fee amount in BNB
 */
export async function getFeeForTransactionType(txType: string): Promise<number> {
  // Try to get fee from settings
  const feeSetting = await storage.getSetting(`fee_${txType}`);
  
  if (feeSetting && !isNaN(parseFloat(feeSetting.value))) {
    return parseFloat(feeSetting.value);
  }
  
  // Use default fee structure if not in settings
  switch (txType) {
    case 'adSubmission':
      return DEFAULT_SETTINGS.fees.adSubmission;
    case 'vote':
      return DEFAULT_SETTINGS.fees.vote;
    case 'progressUpdate':
      return DEFAULT_SETTINGS.fees.progressUpdate;
    case 'nftMinting':
      return DEFAULT_SETTINGS.fees.nftMinting;
    default:
      return 0.01; // Default fee if type not recognized
  }
}

/**
 * Process a transaction and add it to the storage
 * 
 * @param userId User ID making the transaction
 * @param amount Amount in BNB
 * @param txType Transaction type
 * @param txHash Transaction hash (if available)
 * @returns Created transaction record
 */
export async function processTransaction(
  userId: number,
  amount: number,
  txType: string,
  txHash?: string
): Promise<Transaction> {
  // Calculate fee breakdown
  const feeBreakdown = await calculateFeeBreakdown(amount, txType);
  
  // Create transaction record
  const transaction = await storage.createTransaction({
    userId,
    amount: amount.toString(),
    txType,
    platformFee: feeBreakdown.platformFee.toFixed(6),
    founderProfit: feeBreakdown.founderProfit.toFixed(6),
    transactionHash: txHash || `tx_${Date.now()}`,
    status: "confirmed"
  });
  
  return transaction;
}

/**
 * Get tokenomics dashboard data for display
 * 
 * @returns Tokenomics overview with current stats and distribution
 */
export async function getTokenomicsOverview(): Promise<{
  totalFeesCollected: string;
  founderProfit: string;
  platformOperations: string;
  transactionCount: number;
  distribution: typeof DEFAULT_SETTINGS.tokenDistribution;
  platformWallet: string;
}> {
  // Get founder profit from transactions
  const founderProfit = await storage.getFounderProfitTotal();
  
  // Get all transactions to calculate total fees and count
  const allTransactions = [
    ...await storage.getTransactionsByType("adSubmission"),
    ...await storage.getTransactionsByType("vote"),
    ...await storage.getTransactionsByType("nftMinting"),
    ...await storage.getTransactionsByType("progressUpdate")
  ];
  
  // Calculate total fees
  const totalFees = allTransactions.reduce((sum, tx) => {
    return sum + parseFloat(tx.amount || "0");
  }, 0);
  
  // Get platform wallet address
  const platformWalletAddressSetting = await storage.getSetting("platformWalletAddress");
  const platformWallet = platformWalletAddressSetting?.value || DEFAULT_PLATFORM_WALLET;
  
  // Calculate platform operations amount (total fees minus founder profit)
  const founderProfitAmount = parseFloat(founderProfit);
  const platformOperations = totalFees - founderProfitAmount;
  
  return {
    totalFeesCollected: totalFees.toFixed(6),
    founderProfit: founderProfitAmount.toFixed(6),
    platformOperations: platformOperations.toFixed(6),
    transactionCount: allTransactions.length,
    distribution: DEFAULT_SETTINGS.tokenDistribution,
    platformWallet
  };
}