import "reflect-metadata";
import "source-map-support/register";
import { config } from "dotenv";
config();
import express from "express";
import { createServer, Server as HttpServer } from "http";
import { Server } from "./api/server";
import { env } from "./config/globals";
import { logger } from "./config/logger";

import { createConnection, Connection } from "typeorm";

// Start Application
(async function init() {
  try {
    logger.info("Initializing Database connection...");
    const connection: Connection = await createConnection();

    // Init express server
    const app: express.Application = new Server().app;
    const server: HttpServer = createServer(app);

    // Start express server
    server.listen(env.NODE_PORT);

    server.on("listening", () => {
      logger.info(
        `Server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`
      );
    });

    server.on("close", () => {
      connection.close();
      logger.info("Server closed");
    });
  } catch (err) {
    logger.error(err.stack);
  }
})();
