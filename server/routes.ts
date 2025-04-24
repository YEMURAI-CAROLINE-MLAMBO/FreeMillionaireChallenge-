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
} from "@shared/schema";

// Content filtering function
function filterContent(text: string): { approved: boolean; reason?: string } {
  const forbiddenWords = ["scam", "fraud", "illegal", "hack", "porn"];
  
  for (const word of forbiddenWords) {
    if (text.toLowerCase().includes(word)) {
      return {
        approved: false,
        reason: `Content contains prohibited word: ${word}`
      };
    }
  }
  
  return { approved: true };
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
      return next();
    }
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

  // Create ad
  app.post("/api/ads", isAuthenticated, async (req, res) => {
    try {
      const adData = insertAdSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      
      // Filter content
      const titleFilter = filterContent(adData.title);
      const descFilter = filterContent(adData.description);
      
      if (!titleFilter.approved) {
        return res.status(400).json({ 
          message: "Ad title contains inappropriate content",
          reason: titleFilter.reason 
        });
      }
      
      if (!descFilter.approved) {
        return res.status(400).json({ 
          message: "Ad description contains inappropriate content",
          reason: descFilter.reason 
        });
      }
      
      const ad = await storage.createAd(adData);
      res.status(201).json(ad);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid ad data", errors: error.errors });
      }
      res.status(500).json({ message: "Could not create ad" });
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

  // Process payment for an ad
  app.post("/api/ads/:id/payment", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { 
        status, 
        paymentMethod, 
        transactionHash,
        amount 
      } = req.body;
      
      if (!paymentMethod || !["bitcoin", "ethereum"].includes(paymentMethod)) {
        return res.status(400).json({ message: "Invalid payment method" });
      }
      
      const ad = await storage.getAd(id);
      
      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }
      
      if (ad.userId !== req.session.userId) {
        return res.status(403).json({ message: "Not authorized to pay for this ad" });
      }
      
      // In a production app, we would:
      // 1. Verify the crypto transaction using a blockchain API
      // 2. Confirm the payment amount matches expected amount
      // 3. Check if the transaction is confirmed on the blockchain
      
      // For our simulation, we'll trust the client-side information
      
      // Update payment status
      const updatedAd = await storage.updateAdPaymentStatus(id, status || "completed");
      
      // In a real app, we would store additional payment details:
      // - Transaction hash
      // - Payment amount
      // - Payment date
      // - Blockchain confirmation status
      
      res.json({
        success: true,
        message: "Payment processed successfully",
        ad: updatedAd,
        transaction: {
          hash: transactionHash || `tx_${Date.now()}`,
          amount: amount || 25,
          currency: paymentMethod === "bitcoin" ? "BTC" : "ETH",
          date: new Date().toISOString()
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
      const existingParticipant = await storage.getParticipantByUserId(req.session.userId);
      if (existingParticipant) {
        return res.status(400).json({ 
          message: "You are already registered as a participant" 
        });
      }
      
      const participantData = insertParticipantSchema.parse({
        ...req.body,
        userId: req.session.userId,
        order: currentCount + 1 // Assign next order number
      });
      
      // Filter content
      const bioFilter = filterContent(participantData.bio);
      
      if (!bioFilter.approved) {
        return res.status(400).json({ 
          message: "Bio contains inappropriate content",
          reason: bioFilter.reason 
        });
      }
      
      const participant = await storage.createParticipant(participantData);
      
      // Update user role to participant
      const user = await storage.getUser(req.session.userId);
      if (user) {
        await storage.createUser({
          ...user,
          role: "participant"
        });
        req.session.role = "participant";
      }
      
      res.status(201).json(participant);
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

  const httpServer = createServer(app);
  return httpServer;
}
