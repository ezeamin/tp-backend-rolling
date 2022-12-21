import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserDb from '../models/UserSchema';
import ProductsDb from '../models/ProductSchema';

import { randomInteger } from '../helpers/random';
import { validateContent } from '../helpers/validateContent';
import { validateData } from '../helpers/validateData';

export const postProducts = async (req, res) => {
  const body = req.body;

  // 1era validacion - Contenido
  if (!validateContent('POST_PRODUCT', body)) {
    //error de contenido
    res.status(400).json({
      message: 'Campos invalidos',
    });
    return;
  }

  // 2da validacion - Campo por campo
  if (!validateData(body)) {
    res.status(400).json({
      message: 'Campos invalidos',
    });
    return;
  }

  // Datos validos -> Guardar producto

  const newProduct = new ProductsDb({
    id: randomInteger(0, 15000),
    name: body.name,
    price: body.price,
    description: body.description,
    image: body.image,
  });

  try {
    await newProduct.save();

    res.json({
      message: 'Producto creado exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      message: 'ERROR: ' + err,
    });
  }
};

// USERS ---------------

export const postUser = async (req, res) => {
  const body = req.body;

  const password = body.password;

  const cryptedPassword = bcrypt.hashSync(password, 10);

  const newUser = new UserDb({
    id: randomInteger(0, 15000),
    name: body.name,
    lastName: body.lastName,
    username: body.username,
    password: cryptedPassword,
    isActive: true,
  });

  try {
    await newUser.save();

    res.json({
      message: 'Usuario creado exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      message: 'ERROR: ' + err,
    });
  }
};

// AUTH ---------------

export const postLogin = async (req, res) => {
  /*
  req (body) : {
    username: "1234",
    password: "1234"
  }
*/

  // 1- Intentar buscar el usuario en la DB
  const user = await UserDb.findOne({
    username: req.body.username,
  });

  // 2- Validar las credenciales
  // username incorrecto
  // Comparo contraseñas (contraseña incorrecta)
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    res.status(404).json({
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

  const secretKey = process.env.JWT_SECRET_KEY;

  // payload,secretKey
  const token = jwt.sign(userInfo, secretKey, {
    expiresIn: '1h',
  });

  // 4- Devuelvo el token al FE
  res.json({
    token,
  });
};
