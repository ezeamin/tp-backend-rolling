// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// import UserDb from '../models/UserSchema.js';

// const secretKey = process.env.JWT_SECRET_KEY;

// // ----------------------------
// // POST
// // ----------------------------

// export const postLogin = async (req, res) => {
//   try {
//     // 1- Intentar buscar el usuario en la DB
//     const user = await UserDb.findOne({
//       username: req.body.username,
//     });

//     // 2- Validar las credenciales
//     // Casos:
//     // a. username incorrecto
//     // b. comparo contraseñas (contraseña incorrecta)
//     if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
//       res.status(400).json({
//         message: 'Usuario o contraseña no valida(s)',
//       });
//       return;
//     }

//     // 3- Crear token con la informacion pertinente
//     // Pasa todas las validaciones
//     // Eliminar la contraseña de la información del usuario
//     const userInfo = {
//       ...user._doc,
//       password: undefined,
//     };

//     // payload, secretKey, options
//     const token = jwt.sign(userInfo, secretKey, {
//       expiresIn: '1h',
//     });

//     // 4- Devuelvo el token al FE
//     res.json({
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({
//       errors: {
//         message: `ERROR: ${err}`,
//       },
//     });
//   }
// };
