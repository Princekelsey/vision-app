import { Router } from "express";
import { IComponentRoutes } from "../index";
import { UserController } from "./controllers";

export class UserRoutes implements IComponentRoutes<UserController> {
  readonly controller: UserController = new UserController();
  readonly router: Router = Router();

  public constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post("/register", this.controller.registerUser);
    this.router.post("/login", this.controller.signinUser);
  }
}

/**
 * Init User api routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export const registerUserRoutes = (
  router: Router,
  prefix: string = ""
): void => {
  router.use(`${prefix}/users`, new UserRoutes().router);
};
