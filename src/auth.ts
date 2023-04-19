import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from "express";

import { User, comparePassword } from "./Users/Domain/User";
import { UserRepository } from "./Users/Domain/UserRepository";
import { UserFirebaseRepository } from "./Users/Infrastructure/UserFirebaseRepository";

const userRepository: UserRepository = new UserFirebaseRepository();

// Configurar la estrategia de autenticación local
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        // Buscar el usuario en la base de datos
        const user: User = await userRepository.findByUsername(username);

        // Si no se encuentra el usuario, mostrar un mensaje de error
        if (!user) {
          return done(null, false, {
            message: "Email o contraseña incorrectos",
          });
        }

        // Verificar la contraseña del usuario
        const isMatch = await comparePassword(user, password);

        // Si la contraseña no coincide, mostrar un mensaje de error
        if (!isMatch) {
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
    const user: User = await userRepository.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Función de middleware para proteger rutas que requieren autenticación
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: Function
) {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new Error("No autorizado");
}
