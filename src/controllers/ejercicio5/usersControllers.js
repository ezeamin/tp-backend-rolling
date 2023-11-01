import bcrypt from 'bcryptjs';

import UserModel from '../../models/UserSchema.js';

// ----------------------------
// GET
// ----------------------------

export const getUsers = async (_, res) => {
  try {
    const data = await UserModel.find();

    // remove password from response
    const filteredData = data.map((user) => ({
      ...user._doc,
      password: undefined,
    }));

    res.json({
      data: filteredData,
      message:
        filteredData.length > 0 ? 'Usuarios encontrados' : 'Listado vacío',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};

export const getUser = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;

  // Solo puedes ver tu propio perfil o si eres admin todos
  if (id !== user._id && !user.isAdmin) {
    res.status(403).json({
      data: null,
      message: 'No tienes permisos para realizar esta acción',
    });
    return;
  }

  try {
    const data = await UserModel.findOne({ _id: id });

    if (!data) {
      res.status(404).json({
        data: null,
        message: 'Usuario no encontrado',
      });
      return;
    }

    // remove password from response
    data.password = undefined;

    res.json({
      data,
      message: 'Usuario encontrado',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};

// ----------------------------
// POST
// ----------------------------

export const postUser = async (req, res) => {
  const { body } = req;

  const { password } = body;
  const cryptedPassword = bcrypt.hashSync(password, 10);

  const newUser = new UserModel({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    password: cryptedPassword,
    isActive: true,
    isAdmin: false,
  });

  try {
    await newUser.save();

    res.json({
      data: null,
      message: 'Usuario creado exitosamente',
    });
  } catch (err) {
    if (err.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: `El usuario con username "${body.username}" ya existe`,
      });
      return;
    }

    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};

// ----------------------------
// PUT
// ----------------------------

export const putUser = async (req, res) => {
  const {
    params: { id },
    body,
    user,
  } = req;

  // Solo puedes editar tu propio perfil o si eres admin todos
  if (id !== user._id && !user.isAdmin) {
    res.status(403).json({
      data: null,
      message: 'No tienes permisos para realizar esta acción',
    });
    return;
  }

  if (body.password) {
    const cryptedPassword = bcrypt.hashSync(body.password, 10);
    body.password = cryptedPassword;
  }

  try {
    const action = await UserModel.updateOne({ _id: id }, body);

    if (action.modifiedCount === 0) {
      res.status(404).json({
        data: null,
        message: 'Usuario no encontrado',
      });
      return;
    }

    res.json({
      data: null,
      message: 'Usuario actualizado exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};

// ----------------------------
// DELETE
// ----------------------------

// Only change isActive property
export const deleteUser = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;

  // Solo puedes eliminar tu propio perfil o si eres admin todos
  if (id !== user._id && !user.isAdmin) {
    res.status(403).json({
      data: null,
      message: 'No tienes permisos para realizar esta acción',
    });
    return;
  }

  try {
    const action = await UserModel.updateOne(
      {
        _id: id,
        isActive: true,
      },
      {
        isActive: false,
      },
    );

    if (action.modifiedCount === 0) {
      res.status(404).json({
        data: null,
        message: 'Usuario no encontrado',
      });
      return;
    }

    res.json({
      data: null,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};
