import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../../models/UserSchema.js';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// ----------------------------
// POST
// ----------------------------

export const postLogin = async (req, res) => {
  const { body } = req;

  try {
    // 1- Intentar buscar el usuario en la DB (debe estar activo)
    const user = await UserModel.findOne({
      username: body.username,
      isActive: true,
    });

    // 2- Validar las credenciales
    // Casos:
    // a. username incorrecto
    // b. comparo contraseñas (contraseña incorrecta)
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      res.status(400).json({
        data: null,
        message: 'Usuario o contraseña no valida(s)',
      });
      return;
    }

    // 3- Crear token con la informacion pertinente
    // Pasa todas las validaciones
    // Eliminar la contraseña de la información del usuario
    const userInfo = {
      ...user._doc,
      password: undefined,
      isActive: undefined,
    };

    // payload, secretKey, options
    const token = jwt.sign(userInfo, SECRET_KEY, {
      expiresIn: '1h',
    });

    // 4- Devuelvo el token al FE
    res.json({
      message: 'Login correcto',
      data: token,
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};
