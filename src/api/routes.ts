import { registerErrorHandler, registerMiddleware } from "./middleware";
import { Router } from "express";
import { registerApiRoutes } from "./components";

/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */
export const initRestRoutes = (router: Router): void => {
  const prefix: string = "/api/v1";

  registerMiddleware(router);
  registerApiRoutes(router, prefix);
  registerErrorHandler(router);
};
