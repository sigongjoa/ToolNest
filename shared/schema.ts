import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { ITool, IReview } from "../ToolReviewHub/client/src/lib/types";

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  rating: real("rating").notNull(),
  imageUrl: text("image_url").notNull(),
  url: text("url").notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  toolId: integer("tool_id").notNull(),
  content: text("content").notNull(),
  pros: text("pros").array().notNull(),
  cons: text("cons").array().notNull(),
  screenshots: text("screenshots").array().notNull(),
  subtitle: text("subtitle").notNull(),
});

export const insertToolSchema = createInsertSchema(tools).omit({
  id: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export type InsertTool = z.infer<typeof insertToolSchema>;
export type Tool = ITool;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = IReview;

export type ToolWithReview = Tool & {
  review?: Review;
};
