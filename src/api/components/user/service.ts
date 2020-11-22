import { bind } from "decko";
import { Repository, getManager, FindOneOptions } from "typeorm";

import { User } from "../../../entity/User";
import { IComponentServiceStrict } from "../index";

export class UserService implements IComponentServiceStrict<User> {
  readonly repo: Repository<User> = getManager().getRepository(User);

  /**
   * Register new user to db
   *
   * @param user User to save
   * @returns Returns saved user
   */
  @bind
  public async register(user: User): Promise<User> {
    try {
      const newUser: User = await this.repo.save(user);

      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Read a certain user from db
   *
   * @param options Find options
   * @returns Returns a single user
   */
  @bind
  public async read(
    options: FindOneOptions<User> = {}
  ): Promise<User | undefined> {
    try {
      return this.repo.findOne({
        ...options,
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
