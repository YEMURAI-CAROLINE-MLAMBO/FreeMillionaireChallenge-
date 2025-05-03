/**
 * NFT Badge Service
 * 
 * This service handles the creation and minting of NFT badges for the FreeMillionaireChallenge.
 * For the prototype, we'll simulate minting on BSC without actually deploying contracts.
 */

// Using crypto module for random byte generation instead of ethers to avoid compatibility issues
import crypto from 'crypto';
import { InsertNFTBadge, NFTBadge } from '@shared/schema';
import { storage } from './storage';

// Constants for NFT badge generation
const NFT_BADGE_TYPES = {
  PARTICIPANT: 'participant',
  VIEWER: 'viewer',
  SUPPORTER: 'supporter'
};

const DEFAULT_NETWORK = 'bsc-testnet'; // Using testnet for development

// Simulated contract address for our NFT badges
const BADGE_CONTRACT_ADDRESS = '0x123456789012345678901234567890123456789a'; // Simulated address

/**
 * Generate metadata for an NFT badge
 * In a real implementation, this would be stored on IPFS or similar
 */
function generateMetadata(type: string, userId: number, name: string) {
  return {
    name: `FMC ${type.charAt(0).toUpperCase() + type.slice(1)} Badge`,
    description: `FreeMillionaireChallenge badge for ${type} ${name}`,
    image: `https://fmc-badges.example.com/${type}_${userId}.png`, // Simulated image URL
    attributes: [
      {
        trait_type: 'Badge Type',
        value: type
      },
      {
        trait_type: 'User ID',
        value: userId.toString()
      },
      {
        trait_type: 'Mint Date',
        value: new Date().toISOString()
      }
    ]
  };
}

/**
 * Create a new NFT badge for a user
 * This simulates the creation of an NFT without actual blockchain interaction
 */
export async function createNFTBadge(
  userId: number, 
  badgeType: string = NFT_BADGE_TYPES.PARTICIPANT,
  userName: string = 'FMC User'
): Promise<NFTBadge> {
  // Check if user already has a badge
  const existingBadge = await storage.getNFTBadgeByUserId(userId);
  if (existingBadge) {
    return existingBadge;
  }

  // Generate simulated token ID (in production this would come from the contract)
  const tokenId = `${Date.now()}-${userId}-${Math.floor(Math.random() * 1000000)}`;
  
  // Generate metadata
  const metadata = generateMetadata(badgeType, userId, userName);
  
  // Insert the NFT badge into storage
  const badgeData: InsertNFTBadge = {
    userId,
    tokenId,
    contractAddress: BADGE_CONTRACT_ADDRESS,
    tokenUri: `https://fmc-api.example.com/nft/${tokenId}`, // Simulated URI
    badgeType,
    network: DEFAULT_NETWORK,
    metadata
  };
  
  const badge = await storage.createNFTBadge(badgeData);
  
  // Update the user with the badge ID
  const user = await storage.getUser(userId);
  if (user) {
    await storage.updateUserNFTBadge(userId, badge.id);
  }
  
  return badge;
}

/**
 * Simulates a blockchain transaction for minting an NFT
 * In a real implementation, this would interact with a deployed smart contract
 */
export async function simulateMinting(badgeId: number): Promise<string> {
  const badge = await storage.getNFTBadge(badgeId);
  if (!badge) {
    throw new Error('Badge not found');
  }
  
  // Generate a simulated transaction hash using Node.js crypto module
  const randomBytes = crypto.randomBytes(32);
  const transactionHash = '0x' + randomBytes.toString('hex');
  
  // Update the badge with the transaction hash
  await storage.updateNFTBadgeTransaction(badgeId, transactionHash);
  
  return transactionHash;
}

/**
 * Format badge data for display in the frontend
 * Simplifies the data structure for client consumption
 */
export function formatBadgeForDisplay(badge: NFTBadge) {
  // Extract image URL from metadata if available
  let metadataImage: string | null = null;
  if (badge.metadata && 
      typeof badge.metadata === 'object' && 
      badge.metadata !== null &&
      'image' in badge.metadata && 
      typeof badge.metadata.image === 'string') {
    metadataImage = badge.metadata.image;
  }
  
  return {
    id: badge.id,
    userId: badge.userId,
    tokenId: badge.tokenId,
    contractAddress: badge.contractAddress,
    tokenUri: badge.tokenUri,
    badgeType: badge.badgeType,
    network: badge.network,
    imageUrl: badge.imageUrl || metadataImage,
    mintDate: badge.createdAt,
    transactionHash: badge.transactionHash
  };
}