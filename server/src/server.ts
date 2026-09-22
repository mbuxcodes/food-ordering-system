import http from "node:http";
import mongoose from "mongoose";

import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

const server = http.createServer(app);

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    server.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

let isShuttingDown = false;

const shutdown = async (signal: string): Promise<void> => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Starting graceful shutdown...`);

  server.close(async (error) => {
    if (error) {
      console.error("Failed to close HTTP server:", error);
      process.exit(1);
    }

    try {
      console.log("HTTP server closed.");

      await mongoose.disconnect();

      console.log("MongoDB connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Failed during graceful shutdown:", error);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

void startServer();
