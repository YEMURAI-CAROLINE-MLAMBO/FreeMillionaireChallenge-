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
  profileImageUrl: text("profile_image_url"),
  socialTwitter: text("social_twitter"),
  socialLinkedin: text("social_linkedin"),
  socialWebsite: text("social_website"),
  walletAddress: text("wallet_address"), // For NFT and rewards
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
  impactGoals: text("impact_goals"), // Social impact goals
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

export type InsertSetting = z.infer<typeof insertSettingsSchema>;
export type Setting = typeof settings.$inferSelect;
