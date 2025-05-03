/**
 * Webhook support for tokenomics transactions
 * 
 * This is useful for MetaMask integration where you'd receive notifications
 * about completed transactions.
 */

import { Express } from "express";
import { storage } from "./storage";
import { processTransaction } from "./tokenomics";

interface WebhookPayload {
  transactionHash: string;
  amount: string;
  sender: string;
  recipient: string;
  transactionType: 'adSubmission' | 'vote' | 'nftMinting';
  userId?: number;
}

/**
 * Register tokenomics webhook routes
 * @param app Express app
 */
export function registerTokenomicsWebhooks(app: Express) {
  // Webhook for receiving transaction notifications
  app.post("/api/tokenomics/webhook", async (req, res) => {
    try {
      const payload = req.body as WebhookPayload;
      
      // Validate required fields
      if (!payload.transactionHash || !payload.amount || !payload.transactionType) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields"
        });
      }
      
      // Verify this transaction is for our platform's wallet
      const platformWalletAddressSetting = await storage.getSetting("platformWalletAddress");
      const platformWallet = platformWalletAddressSetting?.value || "0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330";
      
      if (payload.recipient && payload.recipient.toLowerCase() !== platformWallet.toLowerCase()) {
        return res.status(400).json({
          success: false,
          message: "Transaction recipient does not match platform wallet"
        });
      }
      
      // Use a test user if userId is not provided
      let userId = payload.userId;
      if (!userId) {
        const testUser = await storage.getUserByUsername("test_user");
        if (testUser) {
          userId = testUser.id;
        } else {
          const newUser = await storage.createUser({
            username: "test_user",
            password: "test123",
            email: "test@example.com",
            role: "user"
          });
          userId = newUser.id;
        }
      }
      
      // Process the transaction
      const transaction = await processTransaction(
        userId,
        parseFloat(payload.amount),
        payload.transactionType,
        payload.transactionHash
      );
      
      // Return success response
      res.json({
        success: true,
        message: "Transaction processed successfully",
        transaction
      });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process transaction webhook"
      });
    }
  });
  
  // Get webhook status and configuration
  app.get("/api/tokenomics/webhook/status", async (req, res) => {
    try {
      const platformWalletAddressSetting = await storage.getSetting("platformWalletAddress");
      const platformWallet = platformWalletAddressSetting?.value || "0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330";
      
      res.json({
        active: true,
        webhookUrl: `${req.protocol}://${req.get('host')}/api/tokenomics/webhook`,
        platformWallet,
        supportedTransactionTypes: ['adSubmission', 'vote', 'nftMinting'],
        examplePayload: {
          transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          amount: "0.025",
          sender: "0xSenderWalletAddress",
          recipient: platformWallet,
          transactionType: "adSubmission"
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get webhook status" });
    }
  });
}