import { validate } from "class-validator";
import { bind } from "decko";
import { NextFunction, Request, Response } from "express";
import { User } from "../../../entity/User";
import { UtilityService } from "../../../utils";
import { UserService } from "./service";

export class UserController {
  private readonly userService: UserService = new UserService();

  /**
   * Register new user
   *
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns Returns HTTP response
   */
  @bind
  public async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ status: 400, error: "Invalid request" });
      }

      const user: User | undefined = await this.userService.read({
        where: {
          email,
        },
      });

      // Email is already taken
      if (user) {
        return res
          .status(400)
          .json({ status: 400, error: "Email is already taken" });
      }

      const requestToValidate = User.create({ ...req.body });

      const errors = await validate(requestToValidate);
      if (errors.length > 0) {
        return res.status(400).json({ status: 400, error: errors });
      }

      const newUser: User = await this.userService.register({
        ...req.body,
        password: await UtilityService.hashPassword(password),
      });

      // Don't send user password in response
      delete newUser.password;

      return res.json({ status: res.statusCode, data: { user: newUser } });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @param req Express request
   * @param res Express response
   * @param next Express next
   * @returns Returns HTTP response
   */
  @bind
  public async signinUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ status: 400, error: "Invalid request" });
      }

      const user: User | undefined = await this.userService.read({
        select: [
          "email",
          "firstName",
          "lastName",
          "password",
          "id",
          "createdAt",
          "updatedAt",
        ],
        where: {
          email,
        },
      });

      // Wrong email or password
      if (
        !user ||
        !(await UtilityService.verifyPassword(password, user.password))
      ) {
        return res
          .status(401)
          .json({ status: 401, error: "Wrong email or password" });
      }

      // Don't send user password in response
      delete user.password;

      return res.json({ status: res.statusCode, data: { user } });
    } catch (err) {
      return next(err);
    }
  }
}
