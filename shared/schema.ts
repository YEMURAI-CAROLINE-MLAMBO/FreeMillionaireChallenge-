import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"), // admin, user, participant, viewer
  walletAddress: text("wallet_address"),
  language: text("language").default("en"), // For multilingual support
  nftBadgeId: integer("nft_badge_id"), // Reference to NFT badge
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  nftBadgeId: true,
});

// Ad schema
export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  reason: text("reason"), // Reason for rejection if applicable
  userId: integer("user_id").notNull(),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status").default("pending"), // pending, completed
  transactionHash: text("transaction_hash"), // For blockchain verification
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdSchema = createInsertSchema(ads).omit({
  id: true,
  createdAt: true,
  status: true,
  reason: true,
  transactionHash: true,
});

// Participant schema
export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  profession: text("profession").notNull(),
  age: integer("age").notNull(), // Must be under 35
  graduationYear: integer("graduation_year").notNull(), // Recent graduates (within 3 years)
  workExperience: integer("work_experience").notNull(), // In months, max 36 months
  projectDescription: text("project_description").notNull(), // Social enterprise project
  profileImageUrl: text("profile_image_url"),
  
  // Social media channels
  socialTwitter: text("social_twitter"),
  socialLinkedin: text("social_linkedin"),
  socialInstagram: text("social_instagram"),
  socialYoutube: text("social_youtube"), // For challenge video updates
  socialTiktok: text("social_tiktok"),
  socialWebsite: text("social_website"),
  
  // Progress tracking
  progressUpdates: jsonb("progress_updates").default([]), // Array of monthly updates
  videoUpdates: jsonb("video_updates").default([]), // Links to 5-10 min videos
  votesReceived: integer("votes_received").default(0), // For viewers choice
  socialInteractions: integer("social_interactions").default(0), // For social media award
  judgesRating: integer("judges_rating").default(0), // For judges choice, 0-100
  
  walletAddress: text("wallet_address"), // For NFT and rewards
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
  impactGoals: text("impact_goals"), // Social impact goals
  currentMilestone: text("current_milestone"), // Current progress milestone
  challengeCompletion: integer("challenge_completion").default(0), // Percentage complete
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertParticipantSchema = createInsertSchema(participants).omit({
  id: true,
  createdAt: true,
  isActive: true,
});

// Viewer schema
export const viewers = pgTable("viewers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  userId: integer("user_id"),
  walletAddress: text("wallet_address"), // For NFT badges
  interests: text("interests").array(), // Array of interests for more targeted content
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertViewerSchema = createInsertSchema(viewers).omit({
  id: true,
  createdAt: true,
});

// NFT Badge schema
export const nftBadges = pgTable("nft_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  tokenId: text("token_id"), // ID on the blockchain
  contractAddress: text("contract_address"), // NFT contract address
  tokenUri: text("token_uri"), // URI to the metadata
  imageUrl: text("image_url"), // Badge image URL
  badgeType: text("badge_type").notNull(), // participant, viewer, supporter
  network: text("network").notNull(), // e.g., "ethereum", "polygon", "testnet"
  transactionHash: text("transaction_hash"), // Minting transaction hash
  metadata: jsonb("metadata"), // Additional metadata
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNFTBadgeSchema = createInsertSchema(nftBadges).omit({
  id: true,
  createdAt: true,
});

// VR Experience schema (placeholder for future features)
export const vrExperiences = pgTable("vr_experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  modelUrl: text("model_url"), // 3D model URL
  sceneData: jsonb("scene_data"), // JSON data for VR scene
  createdBy: integer("created_by").notNull(), // User ID
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVrExperienceSchema = createInsertSchema(vrExperiences).omit({
  id: true,
  createdAt: true,
  isActive: true,
});

// Award categories and voting system
export const awards = pgTable("awards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  rewardAmount: integer("reward_amount").notNull(), // In BNB
  status: text("status").default("upcoming"), // upcoming, active, completed
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Votes for participants
export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  participantId: integer("participant_id").notNull(),
  userId: integer("user_id").notNull(), // Viewer who voted
  awardId: integer("award_id").notNull(), // Which award category
  value: integer("value").default(1), // Rating value if applicable
  comment: text("comment"),
  transactionHash: text("transaction_hash"), // Blockchain proof
  createdAt: timestamp("created_at").defaultNow(),
});

// Progress updates
export const progressUpdates = pgTable("progress_updates", {
  id: serial("id").primaryKey(),
  participantId: integer("participant_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  milestone: text("milestone"),
  videoUrl: text("video_url"), // 5-10 min update video
  images: jsonb("images").default([]), // Array of image URLs
  socialPosts: jsonb("social_posts").default([]), // Links to social media posts
  interactionCount: integer("interaction_count").default(0), // Likes, shares, comments 
  month: integer("month").notNull(), // Month number of the challenge (1-12)
  createdAt: timestamp("created_at").defaultNow(),
});

// Gas fees and founder profit tracking
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: text("amount").notNull(), // String representation of BNB amount
  txType: text("tx_type").notNull(), // ad_payment, registration, voting, etc.
  platformFee: text("platform_fee").notNull(), // Fee charged by platform
  founderProfit: text("founder_profit").notNull(), // Founder's share
  transactionHash: text("transaction_hash").notNull(), 
  status: text("status").default("pending"), // pending, confirmed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

// Settings schema for configurations
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
});

export const insertAwardSchema = createInsertSchema(awards).omit({
  id: true,
  createdAt: true,
});

export const insertVoteSchema = createInsertSchema(votes).omit({
  id: true,
  createdAt: true,
});

export const insertProgressUpdateSchema = createInsertSchema(progressUpdates).omit({
  id: true,
  createdAt: true,
  interactionCount: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true, 
  createdAt: true,
});

// Define Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAd = z.infer<typeof insertAdSchema>;
export type Ad = typeof ads.$inferSelect;

export type InsertParticipant = z.infer<typeof insertParticipantSchema>;
export type Participant = typeof participants.$inferSelect;

export type InsertViewer = z.infer<typeof insertViewerSchema>;
export type Viewer = typeof viewers.$inferSelect;

export type InsertNFTBadge = z.infer<typeof insertNFTBadgeSchema>;
export type NFTBadge = typeof nftBadges.$inferSelect;

export type InsertVrExperience = z.infer<typeof insertVrExperienceSchema>;
export type VrExperience = typeof vrExperiences.$inferSelect;

export type InsertAward = z.infer<typeof insertAwardSchema>;
export type Award = typeof awards.$inferSelect;

export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;

export type InsertProgressUpdate = z.infer<typeof insertProgressUpdateSchema>;
export type ProgressUpdate = typeof progressUpdates.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertSetting = z.infer<typeof insertSettingsSchema>;
export type Setting = typeof settings.$inferSelect;
