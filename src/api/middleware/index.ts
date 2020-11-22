import cors from "cors";
import helmet from "helmet";

import { json, NextFunction, Request, Response, Router } from "express";
import { UtilityService } from "../../utils";

import { logger } from "../../config/logger";
import { env } from "../../config/globals";

/**
 * Init Express middleware
 *
 * @param {Router} router
 * @returns {void}
 */
export const registerMiddleware = (router: Router): void => {
  router.use(helmet());

  router.use(cors());

  router.use(json());

  // Log incoming requests
  router.use((req: Request, res: Response, next: NextFunction) => {
    if (env.NODE_ENV !== "test") {
      const ip: string | string[] | undefined =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      logger.log({
        isRequest: true,
        level: "info",
        message: `${req.method} ${req.url} ${ip}`,
      });
    }

    return next();
  });
};

/**
 * Init Express error handler
 *
 * @param {Router} router
 * @returns {void}
 */
export const registerErrorHandler = (router: Router): Response | void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    UtilityService.handleError(err);

    return res.status(500).json({
      error: err.message || err,
      status: 500,
    });
  });
};
