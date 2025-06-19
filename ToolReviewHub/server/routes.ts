import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tools
  app.get("/api/tools", async (req, res) => {
    try {
      const tools = await storage.getTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tools" });
    }
  });

  // Get tool by slug with review
  app.get("/api/tools/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const tool = await storage.getToolBySlug(slug);
      
      if (!tool) {
        return res.status(404).json({ message: "Tool not found" });
      }
      
      res.json(tool);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tool" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
