import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserDb from '../models/UserSchema.js';

const secretKey = process.env.JWT_SECRET_KEY;

// ----------------------------
// POST
// ----------------------------

export const postLogin = async (req, res) => {
  // 1- Intentar buscar el usuario en la DB
  const user = await UserDb.findOne({
    username: req.body.username,
  });

  // 2- Validar las credenciales
  // Casos:
  // a. username incorrecto
  // b. comparo contraseñas (contraseña incorrecta)
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    res.status(400).json({
      message: 'Usuario o contraseña no valida(s)',
    });
    return;
  }

  // 3- Crear token con la informacion pertinente
  // Pasa todas las validaciones
  const userInfo = {
    name: user.name,
    lastName: user.lastName,
    username: user.username,
    isActive: user.isActive,
  };

  // payload, secretKey, options
  const token = jwt.sign(userInfo, secretKey, {
    expiresIn: '1h',
  });

  // 4- Devuelvo el token al FE
  res.json({
    token,
  });
};

// Falta ruta de logout
export const postLogout = (req, res) => {};
