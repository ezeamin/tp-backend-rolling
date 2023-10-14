import bcrypt from 'bcrypt';

import { generateRandomId } from '../helpers/helpers.js';

import UserDb from '../models/UserSchema.js';

// ----------------------------
// GET
// ----------------------------

export const getUsers = async (req, res) => {
  const data = await UserDb.find();

  res.json({
    data,
  });
};

// ----------------------------
// POST
// ----------------------------

export const postUser = async (req, res) => {
  const { body } = req;

  const { password } = body;

  const cryptedPassword = bcrypt.hashSync(password, 10);

  const newUser = new UserDb({
    id: generateRandomId(),
    name: body.name,
    lastname: body.lastname,
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
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
};

// ----------------------------
// PUT
// ----------------------------

export const putUser = async (req, res) => {
  const params = req.params || {};
  const { body } = req;

  const { id } = params;

  if (!id) {
    res.status(400).json({
      message: 'Falta el id del usuario',
    });
    return;
  }

  try {
    await UserDb.findOneAndUpdate(
      {
        id,
      },
      body,
    );

    res.json({
      message: 'Usuario actualizado exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
};
