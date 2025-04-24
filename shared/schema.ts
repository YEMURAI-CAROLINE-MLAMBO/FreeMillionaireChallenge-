import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"), // admin, user, participant, viewer
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Ad schema
export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  userId: integer("user_id").notNull(),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status").default("pending"), // pending, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdSchema = createInsertSchema(ads).omit({
  id: true,
  createdAt: true,
  status: true,
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
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertViewerSchema = createInsertSchema(viewers).omit({
  id: true,
  createdAt: true,
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

export type InsertSetting = z.infer<typeof insertSettingsSchema>;
export type Setting = typeof settings.$inferSelect;
