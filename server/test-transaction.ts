/**
 * Test utility for simulating transactions to test the tokenomics system
 * This is a development-only utility and would not be included in production
 */

import { storage } from "./storage";
import { processTransaction, calculateFeeBreakdown } from "./tokenomics";

/**
 * Simulates an advertisement payment transaction
 * 
 * @param userId User ID making the payment
 * @param amount Amount in BNB
 * @returns Transaction details
 */
export async function simulateAdPayment(userId: number, amount = 0.025): Promise<{
  transaction: any;
  feeBreakdown: any;
}> {
  // Process the transaction
  const transaction = await processTransaction(
    userId,
    amount,
    "adSubmission",
    `sim_tx_${Date.now()}`
  );
  
  // Get fee breakdown
  const feeBreakdown = await calculateFeeBreakdown(amount, "adSubmission");
  
  return { transaction, feeBreakdown };
}

/**
 * Simulates a vote transaction
 * 
 * @param userId User ID making the vote
 * @param amount Amount in BNB
 * @returns Transaction details
 */
export async function simulateVoteTransaction(userId: number, amount = 0.005): Promise<{
  transaction: any;
  feeBreakdown: any;
}> {
  // Process the transaction
  const transaction = await processTransaction(
    userId,
    amount,
    "vote",
    `sim_vote_${Date.now()}`
  );
  
  // Get fee breakdown
  const feeBreakdown = await calculateFeeBreakdown(amount, "vote");
  
  return { transaction, feeBreakdown };
}

/**
 * Simulates multiple transactions to populate the tokenomics data
 * 
 * @param userId User ID making the transactions
 * @param count Number of transactions to simulate
 */
export async function simulateMultipleTransactions(userId: number, count = 5): Promise<{
  adTransactions: any[];
  voteTransactions: any[];
  totalProfit: string;
}> {
  const adTransactions = [];
  const voteTransactions = [];
  
  // Simulate ad payments
  for (let i = 0; i < count; i++) {
    const { transaction } = await simulateAdPayment(userId, 0.025);
    adTransactions.push(transaction);
  }
  
  // Simulate votes
  for (let i = 0; i < count * 2; i++) {
    const { transaction } = await simulateVoteTransaction(userId, 0.005);
    voteTransactions.push(transaction);
  }
  
  // Get the updated founder profit
  const totalProfit = await storage.getFounderProfitTotal();
  
  return {
    adTransactions,
    voteTransactions,
    totalProfit
  };
}