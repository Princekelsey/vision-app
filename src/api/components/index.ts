import { Repository, FindOneOptions } from "typeorm";
import { Router } from "express";
import { registerUserRoutes } from "./user/routes";

export interface IComponentService<T> {
  readonly repo: Repository<T>;
}

export interface IComponentServiceStrict<T> extends IComponentService<T> {
  read(options: FindOneOptions<T>): Promise<T | undefined>;
  register(entity: T): Promise<T>;
}

export interface IComponentRoutes<T> {
  readonly controller: T;
  readonly router: Router;

  initRoutes(): void;
}

/**
 * Init Express api routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerApiRoutes(router: Router, prefix: string = ""): void {
  registerUserRoutes(router, prefix);
}
