/**
 * NFT Service for FreeMillionaireChallenge
 * Handles the creation and management of NFT badges for affiliates and participants
 */

import { storage } from "./storage";
import { InsertNFTBadge, NFTBadge } from "@shared/schema";

/**
 * Generate metadata for an NFT Badge
 * 
 * @param badgeType The type of badge (affiliate, participant)
 * @param userId The ID of the user associated with the badge
 * @param name The name to use for the badge
 * @returns The metadata for the NFT badge
 */
function generateMetadata(badgeType: string, userId: number, name: string) {
  // Generate a unique token ID for the badge
  const tokenId = `${badgeType}-${userId}-${Date.now()}`;
  
  // Create attributes based on badge type
  const attributes = [
    {
      trait_type: "Badge Type",
      value: badgeType.charAt(0).toUpperCase() + badgeType.slice(1)
    },
    {
      trait_type: "Issue Date",
      value: new Date().toISOString().split('T')[0]
    }
  ];
  
  if (badgeType === 'affiliate') {
    attributes.push({
      trait_type: "Revenue Share",
      value: "5%"
    });
  } else if (badgeType === 'participant') {
    attributes.push({
      trait_type: "Revenue Share",
      value: "10%"
    });
  }
  
  // Generate a base color based on the badge type
  let imageColor = "#FFD700"; // Gold for participants
  if (badgeType === 'affiliate') {
    imageColor = "#C0C0C0"; // Silver for affiliates
  }
  
  // Return the complete metadata
  return {
    name: `${name} ${badgeType.charAt(0).toUpperCase() + badgeType.slice(1)} Badge`,
    description: `Official FreeMillionaireChallenge ${badgeType} badge for ${name}. This NFT badge includes revenue sharing capabilities.`,
    image: `https://fmc-badges.example.com/api/badge?address=${userId}&type=${badgeType}&color=${encodeURIComponent(imageColor)}`,
    external_url: `https://freemillionairechallenge.com/profile/${userId}`,
    attributes,
    tokenId
  };
}

/**
 * Create a new NFT badge for a user
 * This simulates the creation of an NFT without actual blockchain interaction
 * 
 * @param userId ID of the user receiving the badge
 * @param badgeType Type of badge (affiliate, participant)
 * @param name Name of the user or entity receiving the badge
 * @returns The created NFT badge
 */
export async function createNFTBadge(
  userId: number,
  badgeType: string,
  name: string
): Promise<NFTBadge> {
  // Generate metadata for the NFT
  const metadata = generateMetadata(badgeType, userId, name);
  
  // Prepare badge data for storage
  const badgeData: InsertNFTBadge = {
    userId,
    badgeType,
    network: "binance-smart-chain",
    tokenId: metadata.tokenId,
    metadata: JSON.stringify(metadata),
    imageUrl: metadata.image
  };
  
  // Store the badge in the database
  const badge = await storage.createNFTBadge(badgeData);
  
  // Simulate a minting process in the background
  simulateMinting(badge.id).then(txHash => {
    storage.updateNFTBadgeTransaction(badge.id, txHash);
  });
  
  return badge;
}

/**
 * Simulates a blockchain transaction for minting an NFT
 * In a real implementation, this would interact with a deployed smart contract
 * 
 * @param badgeId ID of the badge to mint
 * @returns A simulated transaction hash
 */
export async function simulateMinting(badgeId: number): Promise<string> {
  // In a real implementation, this would use web3.js or ethers.js to interact with the blockchain
  
  // Simulate blockchain network delay (1-3 seconds)
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Generate a fake transaction hash
  const txHash = "0x" + Array(64).fill(0).map(() => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  return txHash;
}

/**
 * Format badge data for display in the frontend
 * Simplifies the data structure for client consumption
 * 
 * @param badge The NFT badge from storage
 * @returns Formatted badge data for display
 */
export function formatBadgeForDisplay(badge: NFTBadge) {
  // Parse the metadata JSON as a strongly typed object
  const metadata = badge.metadata ? JSON.parse(String(badge.metadata)) : {};
  
  return {
    id: badge.id,
    userId: badge.userId,
    badgeType: badge.badgeType,
    tokenId: badge.tokenId,
    network: badge.network,
    name: metadata.name || "",
    description: metadata.description || "",
    image: metadata.image || badge.imageUrl,
    attributes: metadata.attributes || [],
    transactionHash: badge.transactionHash,
    createdAt: badge.createdAt
  };
}

/**
 * Get a user's NFT badge
 * 
 * @param userId ID of the user
 * @returns The user's badge or undefined if none exists
 */
export async function getUserBadge(userId: number) {
  const badge = await storage.getNFTBadgeByUserId(userId);
  if (!badge) return undefined;
  
  return formatBadgeForDisplay(badge);
}

/**
 * Get an NFT badge by its ID
 * 
 * @param badgeId ID of the badge
 * @returns The badge or undefined if none exists
 */
export async function getBadgeById(badgeId: number) {
  const badge = await storage.getNFTBadge(badgeId);
  if (!badge) return undefined;
  
  return formatBadgeForDisplay(badge);
}

/**
 * Get all NFT badges
 * 
 * @returns Array of all badges
 */
export async function getAllBadges() {
  const badges = await storage.getNFTBadges();
  return badges.map(formatBadgeForDisplay);
}