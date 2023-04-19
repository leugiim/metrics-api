import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request, Response } from "express";

import { User } from "../../Users/Domain/User";
import { UserFirebaseRepository } from "../../Users/Infrastructure/UserFirebaseRepository";
import { UserService } from "../../Users/Application/UserService";
import { ResponseApi } from "../Domain/ResponseApi";

const userService: UserService = new UserService(new UserFirebaseRepository());

// Configurar la estrategia de autenticación local
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // Buscar el usuario en la base de datos
        const user: User = await userService.login(username, password);

        // Si no se encuentra el usuario, mostrar un mensaje de error
        if (!user) {
          return done(null, false, {
            message: "Email o contraseña incorrectos",
          });
        }

        // Si la autenticación es exitosa, devolver el usuario
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serializar y deserializar el usuario
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user: User = await userService.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Controlador de inicio de sesión
export const loginAuth = (req: Request, res: Response) => {
  // Autenticar al usuario usando Passport
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // Si ocurre un error durante la autenticación, enviar una respuesta de error
      const response = new ResponseApi();
      response.setError("Error de autenticación", 500);
      return res.status(response.httpStatus).json(response);
    }

    if (!user) {
      // Si las credenciales del usuario no son correctas, enviar una respuesta de error
      const response = new ResponseApi();
      response.setError("Email o contraseña incorrectos", 401);
      return res.status(response.httpStatus).json(response);
    }

    // Si el usuario ha sido autenticado correctamente, iniciar sesión y enviar una respuesta con el usuario autenticado
    req.logIn(user, (err) => {
      if (err) {
        const response = new ResponseApi();
        response.setError("Error de autenticación", 500);
        return res.status(response.httpStatus).json(response);
      }
      return res.json({ user });
    });
  })(req, res);
};

// Función de middleware para proteger rutas que requieren autenticación
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: Function
) {
  if (req.isAuthenticated()) {
    return next();
  }
  const response = new ResponseApi();
  response.setError("No autorizado", 401);
  return res.status(response.httpStatus).json(response);
}
