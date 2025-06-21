import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { nanoid } from "nanoid";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  console.debug('setupVite: Starting Vite server setup.');
  const { createServer: createViteServer, createLogger } = await import("vite");
  const viteLogger = createLogger();

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: [],
  };

  const vite = await createViteServer({
    configFile: false,
    root: path.resolve(import.meta.dirname, "..", "client"),
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "..", "client", "src"),
        "@shared/*": path.resolve(import.meta.dirname, "..", "..", "shared"),
      },
    },
    server: {
      ...serverOptions,
      fs: {
        strict: true,
        deny: ["**/.*"],
        allow: [
          path.resolve(import.meta.dirname, "..", "shared"),
          path.resolve(import.meta.dirname, "..", "client", "src"),
          path.resolve(import.meta.dirname, "..", "client"),
        ],
      },
      port: 3003,
    },
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    appType: "custom",
  });

  app.use((req, res, next) => {
    console.debug(`setupVite: Request received at app.use(vite.middlewares) - ${req.originalUrl}`);
    vite.middlewares(req, res, next);
  });

  app.use("*", async (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      console.debug(`setupVite: Bypassing Vite for API request: ${req.originalUrl}`);
      return next();
    }

    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
