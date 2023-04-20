import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { User } from "../../Users/Domain/User";
import { ResponseApi } from "../Domain/ResponseApi";
import { userService } from "../Infrastructure/DependencyInjection";

dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;

declare global {
  namespace Express {
    interface Request {
      user?: User; // extiende la interfaz Request con la propiedad user
    }
  }
}


const responseError = (res: Response) => {
  const response = new ResponseApi();
  response.setError("Authentication error", 500);
  return res.status(response.getHttpStatus()).json(response);
};
const responseUnauthorized = (res: Response, message: string = null) => {
  const response = new ResponseApi();
  response.setError(message ?? "Unauthorized", 401);
  return res.status(response.getHttpStatus()).json(response);
};

export const loginAuth = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: User = await userService.login(username, password);

    if (!user) {
      const response = new ResponseApi();
      response.setError("Wrong username or password", 401);
      return res.status(response.getHttpStatus()).json(response);
    }

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });

    const response = new ResponseApi();
    response.setContent(token);
    return res.status(response.getHttpStatus()).json(response);
  } catch (error) {
    return responseError(res);
  }
};

// Middleware to check if user is authenticated
export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return responseUnauthorized(res);

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as User;
    req.user = decodedToken;
    next();
  } catch (error) {
    return responseUnauthorized(res, "Invalid token");
  }
};
