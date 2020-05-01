import { Router as ExpressRouter } from "express";
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import ValidationMiddleware from "../middleware/validation.middleware";
import Auth from "../services/auth/passport";

const passport = Auth.getInstance;

export default class UsersRouter {
  private router: ExpressRouter;
  private authController: AuthController;
  private authMiddleware: AuthMiddleware;
  private validationMiddleware: ValidationMiddleware;
  constructor() {
    this.validationMiddleware = new ValidationMiddleware();
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.router = ExpressRouter();
  }

  public get routes() {
    this.router.get("/google", passport.googleAuth);
    this.router.get(
      "/google/callback",
      passport.googleMiddleware,
      this.authController.googleCallback
    );

    this.router.post(
      "/login",
      this.authMiddleware.notAuth(),
      this.validationMiddleware.loginValidation,
      passport.localMiddleware,
      this.authMiddleware.sessionToDb(),
      this.authController.profileAuth
    );

    this.router.get("/login/callback", this.authController.failLogin);
    this.router.post(
      "/registration",
      this.validationMiddleware.registerUserValidation,
      this.authController.registration
    );

    this.router.post(
      "/logout",
      this.authMiddleware.isAuth,
      this.authController.logout
    );

    this.router.get(
      "/profile",
      this.authMiddleware.isAuth,
      this.authController.profileAuth
    );

    this.router.get(
      "/profileNotAuth",
      this.authMiddleware.notAuth(),
      this.authController.profileNotAuth
    );

    return this.router;
  }
}
