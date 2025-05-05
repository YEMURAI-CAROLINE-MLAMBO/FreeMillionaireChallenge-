import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import { z } from "zod";
import {
  insertUserSchema,
  insertAdSchema,
  insertParticipantSchema,
  insertViewerSchema,
  insertProgressUpdateSchema,
  insertVoteSchema,
  insertTransactionSchema,
  insertAwardSchema,
} from "@shared/schema";
import { createNFTBadge, simulateMinting, formatBadgeForDisplay } from "./nft-service";
import { 
  moderateContent, 
  moderateImage, 
  moderateAdvertisement,
  autoModerateContent 
} from "./content-moderation";
import {
  calculateFeeBreakdown,
  getFeeForTransactionType,
  processTransaction,
  getTokenomicsOverview
} from "./tokenomics";
import { 
  simulateAdPayment, 
  simulateVoteTransaction, 
  simulateMultipleTransactions 
} from "./test-transaction";
import { registerTokenomicsWebhooks } from "./tokenomics-webhook";

// Legacy content filtering function - kept for backward compatibility
// New code should use the comprehensive moderation system from content-moderation.ts
function filterContent(text: string): { approved: boolean; reason?: string } {
  if (!text) return { approved: true };
  const result = moderateContent(text);
  return {
    approved: result.approved,
    reason: result.reason
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session setup
  const SessionStore = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "freeMillionaireChallenge",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: 24 * 60 * 60 * 1000 },
      store: new SessionStore({ checkPeriod: 86400000 }), // prune expired entries every 24h
    })
  );

  // Middleware to check authentication
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session && req.session.userId) {
      console.log("Authenticated session found, userId:", req.session.userId);
      return next();
    }
    console.log("No authenticated session found");
    res.status(401).json({ message: "Unauthorized" });
  };

  // Middleware to check admin role
  const isAdmin = async (req: Request, res: Response, next: Function) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    
    next();
  };

  // AUTH ROUTES
  
  // Register
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // Create user
      const user = await storage.createUser(userData);
      
      // Set session
      req.session.userId = user.id;
      req.session.role = user.role;
      
      res.status(201).json({ 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not register user" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set session
      req.session.userId = user.id;
      req.session.role = user.role;
      
      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ message: "User not found" });
      }
      
      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user data" });
    }
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  // AD ROUTES
  
  // Get all ads
  app.get("/api/ads", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      
      const ads = await storage.getAds(limit, offset);
      res.json(ads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ads" });
    }
  });

  // Get ads by current user
  app.get("/api/ads/user", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const ads = await storage.getAdsByUser(req.session.userId);
      res.json(ads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user ads" });
    }
  });

  // Get ad by id
  app.get("/api/ads/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const ad = await storage.getAd(id);
      
      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }
      
      res.json(ad);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ad" });
    }
  });

  // Create ad with auto-moderation
  app.post("/api/ads", isAuthenticated, async (req, res) => {
    try {
      const adData = insertAdSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      // Use advanced content moderation system
      const moderationResult = autoModerateContent({
        title: adData.title,
        description: adData.description,
        imageUrl: adData.imageUrl,
        targetUrl: adData.targetUrl
      });
      
      // If content is rejected by moderation system
      if (moderationResult.decision === 'rejected') {
        return res.status(400).json({ 
          message: "Advertisement contains inappropriate content",
          reason: moderationResult.reason,
          details: moderationResult.moderationResults.rejectionReasons
        });
      }
      
      // Set initial status based on moderation decision
      const initialStatus = moderationResult.decision === 'approved' ? 'approved' : 'pending';
      
      // Create ad with auto-approved status if it passes moderation
      const ad = await storage.createAd({
        ...adData,
        status: initialStatus
      });
      
      // Add moderation results to the response
      res.status(201).json({
        ad,
        moderation: {
          decision: moderationResult.decision,
          confidenceScore: moderationResult.confidenceScore
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid ad data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not create ad" });
    }
  });
  
  // Check ad content against moderation guidelines (without creating the ad)
  app.post("/api/ads/check-content", async (req, res) => {
    try {
      const { title, description, imageUrl, targetUrl } = req.body;
      
      if (!title && !description) {
        return res.status(400).json({ message: "Title or description is required" });
      }
      
      // Use advanced content moderation system
      const moderationResult = autoModerateContent({
        title: title || "",
        description: description || "",
        imageUrl,
        targetUrl
      });
      
      res.json({
        approved: moderationResult.decision === 'approved',
        decision: moderationResult.decision,
        reason: moderationResult.reason,
        confidenceScore: moderationResult.confidenceScore,
        details: moderationResult.moderationResults.rejectionReasons
      });
    } catch (error) {
      res.status(500).json({ message: "Content moderation check failed" });
    }
  });

  // Update ad status (admin only)
  app.patch("/api/ads/:id/status", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const ad = await storage.updateAdStatus(id, status);
      
      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }
      
      res.json(ad);
    } catch (error) {
      res.status(500).json({ message: "Failed to update ad status" });
    }
  });

  // Process payment for an ad with auto-approval and tokenomics
  app.post("/api/ads/:id/payment", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { 
        paymentMethod, 
        transactionHash,
        amount,
        senderAddress,
        network 
      } = req.body;
      
      // Auto-approved status - no manual review needed
      const status = "completed";
      
      // Validate payment method - only accept BNB (BSC) for now
      if (!paymentMethod || !["bnb"].includes(paymentMethod.toLowerCase())) {
        return res.status(400).json({ 
          message: "Invalid payment method. Only BNB (Binance Smart Chain) is currently accepted" 
        });
      }
      
      const ad = await storage.getAd(id);
      
      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }
      
      if (ad.userId !== req.session.userId) {
        return res.status(403).json({ message: "Not authorized to pay for this ad" });
      }
      
      // Get ad submission fee
      const adFee = await getFeeForTransactionType("adSubmission");
      const paymentAmount = amount ? parseFloat(amount.toString()) : adFee;
      
      // Process transaction with tokenomics fee breakdown
      const transaction = await processTransaction(
        req.session.userId,
        paymentAmount,
        "adSubmission",
        transactionHash
      );
      
      // Calculate fee breakdown to show the user
      const feeBreakdown = await calculateFeeBreakdown(paymentAmount, "adSubmission");
      
      // Update ad payment status and save transaction hash
      const updatedAd = await storage.updateAdPaymentStatus(
        id, 
        status,
        transaction.transactionHash
      );
      
      // Store currency mapping for different payment methods
      const currencyMap: Record<string, string> = {
        "bitcoin": "BTC",
        "ethereum": "ETH",
        "bnb": "BNB"
      };
      
      // Return transaction details to the client with tokenomics breakdown
      res.json({
        success: true,
        message: "Payment processed successfully",
        ad: updatedAd,
        transaction: {
          hash: transaction.transactionHash,
          amount: paymentAmount,
          currency: currencyMap[paymentMethod] || "BNB",
          network: network || "bsc",
          date: new Date().toISOString()
        },
        tokenomics: {
          totalAmount: feeBreakdown.totalAmount,
          platformFee: feeBreakdown.platformFee,
          founderProfit: feeBreakdown.founderProfit,
          founderProfitPercentage: "30%",
          recipientWallet: feeBreakdown.platformWallet
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Payment processing failed" });
    }
  });

  // PARTICIPANT ROUTES
  
  // Get all participants
  app.get("/api/participants", async (req, res) => {
    try {
      const participants = await storage.getParticipants();
      res.json(participants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participants" });
    }
  });

  // Get participant by current user session
  app.get("/api/participants/user", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const participant = await storage.getParticipantByUserId(req.session.userId);
      
      if (!participant) {
        return res.status(404).json({ message: "Participant not found for this user" });
      }
      
      res.json(participant);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participant data" });
    }
  });

  // Get participant by id
  app.get("/api/participants/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const participant = await storage.getParticipant(id);
      
      if (!participant) {
        return res.status(404).json({ message: "Participant not found" });
      }
      
      res.json(participant);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participant" });
    }
  });

  // Check participant eligibility
  app.post("/api/participants/check-eligibility", isAuthenticated, async (req, res) => {
    try {
      const { age, graduationYear, workExperience } = req.body;
      
      // Get eligibility rules from settings
      const maxAgeSetting = await storage.getSetting("maxParticipantAge");
      const maxAge = maxAgeSetting ? parseInt(maxAgeSetting.value) : 35;
      
      const maxExpSetting = await storage.getSetting("maxWorkExperience");
      const maxExp = maxExpSetting ? parseInt(maxExpSetting.value) : 36; // 3 years in months
      
      const requireRecentGradSetting = await storage.getSetting("requireRecentGraduate");
      const requireRecentGrad = requireRecentGradSetting ? requireRecentGradSetting.value === "true" : true;
      
      // Current year for graduation check
      const currentYear = new Date().getFullYear();
      
      // Validation results
      const eligibilityResults = {
        eligible: true,
        reasons: [] as string[],
        checks: {
          age: age <= maxAge,
          workExperience: workExperience <= maxExp,
          recentGraduate: !requireRecentGrad || (currentYear - graduationYear <= 3)
        }
      };
      
      // Check age
      if (age > maxAge) {
        eligibilityResults.eligible = false;
        eligibilityResults.reasons.push(`Age must be ${maxAge} or under`);
      }
      
      // Check work experience
      if (workExperience > maxExp) {
        eligibilityResults.eligible = false;
        eligibilityResults.reasons.push(`Work experience must be ${maxExp} months (3 years) or less`);
      }
      
      // Check graduation year if required
      if (requireRecentGrad && (currentYear - graduationYear > 3)) {
        eligibilityResults.eligible = false;
        eligibilityResults.reasons.push(`Must be a recent graduate (within the last 3 years)`);
      }
      
      res.json(eligibilityResults);
    } catch (error) {
      res.status(500).json({ message: "Failed to check eligibility" });
    }
  });
  
  // Check if the current user is eligible to register as a participant (on the whitelist)
  app.get("/api/participants/eligibility", async (req, res) => {
    try {
      // Don't use middleware to ensure we can see the error properly
      if (!req.session || !req.session.userId) {
        console.log("No session or userId found in session");
        return res.status(401).json({ message: "Authentication required" });
      }
      
      console.log("Session userId:", req.session.userId);
      
      // Get the current user
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        console.log("User not found for id:", req.session.userId);
        return res.status(401).json({ message: "User not found" });
      }
      
      console.log("User found:", user.username, user.email);
      
      // If user is already a participant, they are eligible
      const existingParticipant = await storage.getParticipantByUserId(req.session.userId);
      if (existingParticipant) {
        console.log("User is already a participant");
        return res.json({
          eligible: true,
          message: "You are already registered as a participant"
        });
      }
      
      // If user is already a participant by role (legacy check), they are eligible
      if (user.role === "participant") {
        console.log("User has participant role");
        return res.json({
          eligible: true,
          message: "You are already registered as a participant"
        });
      }
      
      // If user is admin, they are eligible
      if (user.role === "admin") {
        console.log("User is admin, automatically eligible");
        return res.json({
          eligible: true,
          message: "As an admin, you can register as a participant"
        });
      }
      
      // Check whitelist
      const whitelistSetting = await storage.getSetting("participantWhitelist");
      const whitelist = whitelistSetting ? whitelistSetting.value.split(',').map(email => email.trim()) : [];
      
      console.log("Whitelist:", whitelist);
      console.log("User email:", user.email);
      
      // Check if current user's email is on whitelist
      const isWhitelisted = whitelist.includes(user.email);
      
      console.log("Is user whitelisted?", isWhitelisted);
      
      res.json({
        eligible: isWhitelisted,
        message: isWhitelisted 
          ? "You have been selected to participate in the Free Millionaire Challenge" 
          : "You are not on the invited participants list. This challenge is invitation-only."
      });
    } catch (error) {
      console.error("Error checking eligibility:", error);
      res.status(500).json({ message: "Failed to check eligibility" });
    }
  });

  // Apply as participant
  app.post("/api/participants", isAuthenticated, async (req, res) => {
    try {
      // Check if maximum participants reached
      const currentCount = await storage.getActiveParticipantsCount();
      const maxParticipantsSetting = await storage.getSetting("maxParticipants");
      const maxParticipants = maxParticipantsSetting 
        ? parseInt(maxParticipantsSetting.value) 
        : 9;
      
      if (currentCount >= maxParticipants) {
        return res.status(400).json({ 
          message: `Maximum number of participants (${maxParticipants}) reached` 
        });
      }
      
      // Check if user is already a participant
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const existingParticipant = await storage.getParticipantByUserId(req.session.userId);
      if (existingParticipant) {
        return res.status(400).json({ 
          message: "You are already registered as a participant" 
        });
      }
      
      // Check if user is on the whitelist
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Get whitelist setting
      const whitelistSetting = await storage.getSetting("participantWhitelist");
      
      // Only allow registration if user is admin OR if user email is on the whitelist
      const whitelist = whitelistSetting ? whitelistSetting.value.split(',').map(email => email.trim()) : [];
      const isAdmin = user.role === "admin";
      const isWhitelisted = whitelist.includes(user.email);
      
      if (!isAdmin && !isWhitelisted) {
        return res.status(403).json({ 
          message: "You are not eligible to register as a participant. This challenge is invitation-only." 
        });
      }
      
      const participantData = insertParticipantSchema.parse({
        ...req.body,
        userId: req.session.userId,
        order: currentCount + 1 // Assign next order number
      });
      
      // Check eligibility criteria
      const maxAgeSetting = await storage.getSetting("maxParticipantAge");
      const maxAge = maxAgeSetting ? parseInt(maxAgeSetting.value) : 35;
      
      if (participantData.age > maxAge) {
        return res.status(400).json({ message: `Participants must be ${maxAge} years or younger` });
      }
      
      const maxExpSetting = await storage.getSetting("maxWorkExperience");
      const maxExp = maxExpSetting ? parseInt(maxExpSetting.value) : 36; // 3 years in months
      
      if (participantData.workExperience > maxExp) {
        return res.status(400).json({ message: `Work experience must be ${maxExp} months (3 years) or less` });
      }
      
      const currentYear = new Date().getFullYear();
      const requireRecentGradSetting = await storage.getSetting("requireRecentGraduate");
      const requireRecentGrad = requireRecentGradSetting ? requireRecentGradSetting.value === "true" : true;
      
      if (requireRecentGrad && (currentYear - participantData.graduationYear > 3)) {
        return res.status(400).json({ message: `Must be a recent graduate (within the last 3 years)` });
      }
      
      // Filter content
      const bioFilter = filterContent(participantData.bio);
      const nameFilter = filterContent(participantData.name);
      const projectFilter = filterContent(participantData.projectDescription);
      
      if (!bioFilter.approved) {
        return res.status(400).json({ 
          message: "Bio contains inappropriate content",
          reason: bioFilter.reason 
        });
      }
      
      if (!nameFilter.approved) {
        return res.status(400).json({ 
          message: "Name contains inappropriate content",
          reason: nameFilter.reason 
        });
      }
      
      if (!projectFilter.approved) {
        return res.status(400).json({ 
          message: "Project description contains inappropriate content",
          reason: projectFilter.reason 
        });
      }
      
      const participant = await storage.createParticipant(participantData);
      
      // Update user role to participant
      if (req.session.userId) {
        const user = await storage.getUser(req.session.userId);
        if (user) {
          await storage.createUser({
            ...user,
            role: "participant"
          });
          req.session.role = "participant";
        }
      }
      
      // Create NFT badge for the participant
      const badgeData = await createNFTBadge("participant", req.session.userId, participantData.name);
      
      // Mint the NFT
      const txHash = await simulateMinting(badgeData.id);
      await storage.updateNFTBadgeTransaction(badgeData.id, txHash);
      
      // Update user with NFT badge reference
      if (req.session.userId) {
        await storage.updateUserNFTBadge(req.session.userId, badgeData.id);
      }
      
      res.status(201).json({
        participant,
        badge: formatBadgeForDisplay(badgeData)
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid participant data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not register as participant" });
    }
  });

  // VIEWER ROUTES
  
  // Register as viewer
  app.post("/api/viewers", async (req, res) => {
    try {
      let userId = req.session?.userId;
      const viewerData = insertViewerSchema.parse({
        ...req.body,
        userId: userId || null
      });
      
      // Check if email already registered
      const existingViewer = await storage.getViewerByEmail(viewerData.email);
      if (existingViewer) {
        return res.status(400).json({ message: "Email already registered as viewer" });
      }
      
      const viewer = await storage.createViewer(viewerData);
      res.status(201).json(viewer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid viewer data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not register as viewer" });
    }
  });

  // Get challenge settings
  app.get("/api/challenge/settings", async (req, res) => {
    try {
      const challengeEndDate = await storage.getSetting("challengeEndDate");
      const maxParticipants = await storage.getSetting("maxParticipants");
      
      const settings = {
        challengeEndDate: challengeEndDate?.value || "2025-08-01T00:00:00.000Z",
        maxParticipants: maxParticipants?.value || "9"
      };
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch challenge settings" });
    }
  });
  
  // Get all settings (admin only)
  app.get("/api/admin/all-settings", isAdmin, async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });
  
  // Create or update settings (admin only)
  app.post("/api/admin/settings", isAdmin, async (req, res) => {
    try {
      const { key, value, description } = req.body;
      
      if (!key || value === undefined) {
        return res.status(400).json({ message: "Key and value are required" });
      }
      
      const setting = await storage.createOrUpdateSetting({
        key,
        value: value.toString(),
        description: description || ""
      });
      
      res.status(200).json(setting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update setting" });
    }
  });
  
  // NFT BADGE ROUTES
  
  // Get NFT badge for the current user
  app.get("/api/nft/badge", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const badge = await storage.getNFTBadgeByUserId(req.session.userId);
      
      if (!badge) {
        return res.status(404).json({ message: "NFT badge not found" });
      }
      
      res.json(formatBadgeForDisplay(badge));
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NFT badge" });
    }
  });
  
  // Create NFT badge for user (issued on registration/participation)
  app.post("/api/nft/badge", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user already has a badge
      const existingBadge = await storage.getNFTBadgeByUserId(req.session.userId);
      if (existingBadge) {
        return res.json(formatBadgeForDisplay(existingBadge));
      }
      
      // Get the user to determine their role and badge type
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Determine badge type based on user role
      const badgeType = user.role === "participant" ? "participant" : 
                        user.role === "admin" ? "admin" : "viewer";
      
      // Create the NFT badge
      const badge = await createNFTBadge(user.id, badgeType, user.username);
      
      res.status(201).json(formatBadgeForDisplay(badge));
    } catch (error) {
      console.error("Error creating NFT badge:", error);
      res.status(500).json({ message: "Failed to create NFT badge" });
    }
  });
  
  // Mint an NFT badge (simulate transaction)
  app.post("/api/nft/badge/mint", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Get the user's badge
      const badge = await storage.getNFTBadgeByUserId(req.session.userId);
      if (!badge) {
        return res.status(404).json({ message: "NFT badge not found. Create a badge first." });
      }
      
      // Check if badge is already minted
      if (badge.transactionHash) {
        return res.status(400).json({ 
          message: "Badge already minted",
          transactionHash: badge.transactionHash
        });
      }
      
      // Simulate minting transaction
      const transactionHash = await simulateMinting(badge.id);
      
      // Get the updated badge
      const updatedBadge = await storage.getNFTBadge(badge.id);
      if (!updatedBadge) {
        throw new Error("Failed to retrieve updated badge");
      }
      
      res.json({
        success: true,
        message: "NFT badge minted successfully",
        transactionHash,
        badge: formatBadgeForDisplay(updatedBadge)
      });
    } catch (error) {
      console.error("Error minting NFT badge:", error);
      res.status(500).json({ message: "Failed to mint NFT badge" });
    }
  });

  // PROGRESS UPDATES AND CHALLENGE TRACKING
  
  // Get progress updates for a participant
  app.get("/api/participants/:id/progress", async (req, res) => {
    try {
      const participantId = parseInt(req.params.id);
      const progressUpdates = await storage.getProgressUpdatesByParticipant(participantId);
      res.json(progressUpdates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress updates" });
    }
  });
  
  // Submit a progress update (for participants only)
  app.post("/api/progress-update", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Check if user is a participant
      const participant = await storage.getParticipantByUserId(req.session.userId);
      if (!participant) {
        return res.status(403).json({ message: "Only participants can submit progress updates" });
      }
      
      const updateData = insertProgressUpdateSchema.parse({
        ...req.body,
        participantId: participant.id
      });
      
      // Check update content
      const titleFilter = filterContent(updateData.title);
      const descFilter = filterContent(updateData.description);
      
      if (!titleFilter.approved) {
        return res.status(400).json({ 
          message: "Title contains inappropriate content",
          reason: titleFilter.reason 
        });
      }
      
      if (!descFilter.approved) {
        return res.status(400).json({ 
          message: "Description contains inappropriate content",
          reason: descFilter.reason 
        });
      }
      
      // Check if month is valid (1-12)
      if (updateData.month < 1 || updateData.month > 12) {
        return res.status(400).json({ message: "Month must be between 1 and 12" });
      }
      
      // Check if update for this month already exists
      const existingUpdates = await storage.getProgressUpdatesByParticipant(participant.id);
      const existingMonthUpdate = existingUpdates.find(update => update.month === updateData.month);
      
      if (existingMonthUpdate) {
        return res.status(400).json({ 
          message: `You have already submitted an update for month ${updateData.month}` 
        });
      }
      
      const progressUpdate = await storage.createProgressUpdate(updateData);
      
      // Create gas fee transaction for the participant
      const platformWalletAddressSetting = await storage.getSetting("platformWalletAddress");
      const platformWalletAddress = platformWalletAddressSetting?.value || 
        "0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330";
      
      const founderPercentageSetting = await storage.getSetting("founderProfitPercentage");
      const founderPercentage = founderPercentageSetting ? 
        parseInt(founderPercentageSetting.value) : 30;
      
      // Simulate blockchain transaction with gas fee
      const gasPrice = 0.001; // Sample gas price in BNB
      const founderProfit = (gasPrice * founderPercentage / 100).toFixed(6);
      const platformFee = (gasPrice - parseFloat(founderProfit)).toFixed(6);
      
      // Create a transaction record
      await storage.createTransaction({
        userId: req.session.userId,
        amount: gasPrice.toString(),
        txType: "progress_update",
        platformFee: platformFee,
        founderProfit: founderProfit,
        transactionHash: `tx_progress_${Date.now()}`,
        status: "confirmed"
      });
      
      res.status(201).json(progressUpdate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress update data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not submit progress update" });
    }
  });
  
  // Vote for a participant
  app.post("/api/participants/:id/vote", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const participantId = parseInt(req.params.id);
      const { awardId, comment } = req.body;
      
      // Check if participant exists
      const participant = await storage.getParticipant(participantId);
      if (!participant) {
        return res.status(404).json({ message: "Participant not found" });
      }
      
      // Check if award exists
      const award = await storage.getAward(awardId);
      if (!award) {
        return res.status(404).json({ message: "Award not found" });
      }
      
      // Check if award is active
      if (award.status !== "active") {
        return res.status(400).json({ message: `Voting for ${award.name} is not currently active` });
      }
      
      // Check if user already voted for this participant in this award
      const existingVotes = await storage.getVotesByUser(req.session.userId);
      const alreadyVoted = existingVotes.some(
        vote => vote.participantId === participantId && vote.awardId === awardId
      );
      
      if (alreadyVoted) {
        return res.status(400).json({ message: "You have already voted for this participant in this award category" });
      }
      
      // Create the vote
      const voteData = insertVoteSchema.parse({
        participantId,
        userId: req.session.userId,
        awardId,
        comment: comment || null,
        value: 1 // Default to 1 for simple voting
      });
      
      const vote = await storage.createVote(voteData);
      
      // Increment participant's vote count
      const updatedVoteCount = await storage.countVotesForParticipant(participantId);
      
      // Create gas fee transaction for voting
      const platformWalletAddressSetting = await storage.getSetting("platformWalletAddress");
      const platformWalletAddress = platformWalletAddressSetting?.value || 
        "0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330";
      
      const votingFeeSetting = await storage.getSetting("votingFee");
      const votingFee = votingFeeSetting ? parseFloat(votingFeeSetting.value) : 0.005;
      
      const founderPercentageSetting = await storage.getSetting("founderProfitPercentage");
      const founderPercentage = founderPercentageSetting ? 
        parseInt(founderPercentageSetting.value) : 30;
      
      const founderProfit = (votingFee * founderPercentage / 100).toFixed(6);
      const platformFee = (votingFee - parseFloat(founderProfit)).toFixed(6);
      
      // Create a transaction record
      const transaction = await storage.createTransaction({
        userId: req.session.userId,
        amount: votingFee.toString(),
        txType: "vote",
        platformFee: platformFee,
        founderProfit: founderProfit,
        transactionHash: `tx_vote_${Date.now()}`,
        status: "confirmed"
      });
      
      // Update the vote with transaction hash
      await storage.createVote({
        ...vote,
        transactionHash: transaction.transactionHash
      });
      
      res.status(201).json({ 
        success: true,
        message: "Vote submitted successfully",
        vote,
        voteCount: updatedVoteCount,
        transaction: {
          hash: transaction.transactionHash,
          amount: votingFee,
          currency: "BNB",
          date: new Date().toISOString()
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vote data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not submit vote" });
    }
  });
  
  // Get all transactions for the current user
  app.get("/api/transactions", isAuthenticated, async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const transactions = await storage.getTransactionsByUser(req.session.userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  
  // Get founder profit total
  app.get("/api/founder-profit", async (req, res) => {
    try {
      const totalProfit = await storage.getFounderProfitTotal();
      res.json({ totalProfit });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate founder profit" });
    }
  });
  
  // Get tokenomics dashboard data
  app.get("/api/tokenomics", async (req, res) => {
    try {
      const tokenomicsData = await getTokenomicsOverview();
      
      // Get transaction count by type
      const adPayments = await storage.getTransactionsByType("adSubmission");
      const votes = await storage.getTransactionsByType("vote");
      const nftMintings = await storage.getTransactionsByType("nftMinting");
      
      // Add transaction breakdown to the response
      res.json({
        ...tokenomicsData,
        transactionBreakdown: {
          adPayments: adPayments.length,
          votes: votes.length,
          nftMintings: nftMintings.length
        },
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tokenomics data" });
    }
  });
  
  // Simulate transactions for testing tokenomics (development only)
  app.post("/api/test/simulate-transactions", async (req, res) => {
    try {
      // Create a test user if one doesn't exist
      let testUser = await storage.getUserByUsername("test_user");
      if (!testUser) {
        testUser = await storage.createUser({
          username: "test_user",
          email: "test@example.com",
          password: "test123",
          role: "user"
        });
      }
      
      // Get transaction count parameter
      const count = req.query.count ? parseInt(req.query.count as string) : 5;
      
      // Simulate multiple transactions
      const result = await simulateMultipleTransactions(testUser.id, count);
      
      // Get updated tokenomics data
      const tokenomicsData = await getTokenomicsOverview();
      
      res.json({
        message: `Successfully simulated ${count} ad payments and ${count * 2} votes`,
        transactionCounts: {
          adPayments: result.adTransactions.length,
          votes: result.voteTransactions.length
        },
        totalFounderProfit: result.totalProfit,
        tokenomics: tokenomicsData
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to simulate transactions" });
    }
  });
  
  // Simple endpoint to add a transaction (for testing)
  app.get("/api/test/add-transaction", async (req, res) => {
    try {
      // Create a test user if one doesn't exist
      let testUser = await storage.getUserByUsername("test_user");
      if (!testUser) {
        testUser = await storage.createUser({
          username: "test_user",
          email: "test@example.com",
          password: "test123",
          role: "user"
        });
      }
      
      // Create a single ad payment
      const { transaction, feeBreakdown } = await simulateAdPayment(testUser.id, 0.025);
      
      // Get updated tokenomics data
      const tokenomicsData = await getTokenomicsOverview();
      
      res.json({
        message: "Transaction added successfully",
        transaction,
        feeBreakdown,
        tokenomics: tokenomicsData
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to add test transaction" });
    }
  });
  
  // ADMIN ROUTES
  
  // Get all ads for admin
  app.get("/api/admin/ads", isAdmin, async (req, res) => {
    try {
      const ads = await storage.getAds(100, 0); // Get more ads for admin
      res.json(ads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ads" });
    }
  });

  // Get all participants for admin
  app.get("/api/admin/participants", isAdmin, async (req, res) => {
    try {
      const participants = await storage.getParticipants();
      res.json(participants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participants" });
    }
  });

  // Get all viewers for admin
  app.get("/api/admin/viewers", isAdmin, async (req, res) => {
    try {
      const viewers = await storage.getViewers();
      res.json(viewers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch viewers" });
    }
  });

  // Update settings
  app.post("/api/admin/settings", isAdmin, async (req, res) => {
    try {
      const { key, value, description } = req.body;
      
      if (!key || !value) {
        return res.status(400).json({ message: "Key and value are required" });
      }
      
      const setting = await storage.createOrUpdateSetting({ 
        key, 
        value,
        description 
      });
      
      res.json(setting);
    } catch (error) {
      res.status(500).json({ message: "Failed to update setting" });
    }
  });

  // Setup an admin user if one doesn't exist
  const setupAdmin = async () => {
    const admins = await storage.getUsersByRole("admin");
    if (admins.length === 0) {
      await storage.createUser({
        username: "admin",
        password: "admin123", // In production, this should be securely hashed
        email: "admin@example.com",
        role: "admin"
      });
      console.log("Admin user created: admin / admin123");
    }
  };

  // Call setupAdmin
  await setupAdmin();
  
  // Register tokenomics webhooks
  registerTokenomicsWebhooks(app);
  
  // Public transaction verification endpoint
  app.get("/api/transactions/verify/:hash", async (req, res) => {
    try {
      const { hash } = req.params;
      
      if (!hash) {
        return res.status(400).json({ message: "Transaction hash is required" });
      }
      
      const transactions = await storage.getTransactionsByType("adSubmission");
      const transaction = transactions.find(tx => tx.transactionHash === hash);
      
      if (!transaction) {
        return res.status(404).json({ 
          message: "Transaction not found", 
          verified: false 
        });
      }
      
      // Return transaction details with public info only
      res.json({
        verified: true,
        transaction: {
          txHash: transaction.transactionHash,
          type: transaction.txType,
          amount: transaction.amount,
          status: transaction.status,
          timestamp: transaction.createdAt,
          founderProfit: transaction.founderProfit,
          platformFee: transaction.platformFee
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to verify transaction" });
    }
  });

  // VR EXPERIENCE ROUTES
  
  // Get all VR experiences
  app.get("/api/vr-experiences", async (req, res) => {
    try {
      const experiences = await storage.getVrExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch VR experiences" });
    }
  });
  
  // Get active VR experiences only
  app.get("/api/vr-experiences/active", async (req, res) => {
    try {
      const experiences = await storage.getActiveVrExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active VR experiences" });
    }
  });
  
  // Get specific VR experience
  app.get("/api/vr-experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experience = await storage.getVrExperience(id);
      
      if (!experience) {
        return res.status(404).json({ message: "VR experience not found" });
      }
      
      res.json(experience);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch VR experience" });
    }
  });
  
  // Create VR experience (admin only)
  app.post("/api/vr-experiences", isAdmin, async (req, res) => {
    try {
      // Basic content moderation
      const contentFilter = moderateContent(req.body.title + " " + req.body.description);
      if (!contentFilter.approved) {
        return res.status(400).json({ message: `Content moderation failed: ${contentFilter.reason}` });
      }
      
      const experience = await storage.createVrExperience({
        ...req.body,
        createdBy: req.session.userId
      });
      
      res.status(201).json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid VR experience data", errors: error.errors });
      }
      res.status(400).json({ message: "Could not create VR experience" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
