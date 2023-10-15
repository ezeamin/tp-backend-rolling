import bcrypt from 'bcrypt';

import UserDb from '../models/UserSchema.js';

// ----------------------------
// GET
// ----------------------------

// El "_" es un parámetro que no se usa (sería el req), pero que se pone para que no de error
export const getUsers = async (_, res) => {
  try {
    const data = await UserDb.find();

    // remove password from response
    const filteredData = data.map((user) => ({
      ...user._doc,
      password: undefined,
    }));

    res.json({
      data: filteredData,
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
};

export const getUser = async (req, res) => {
  const params = req.params || {};
  const { id } = params;

  if (!id) {
    res.status(400).json({
      message: 'Falta el id del usuario',
    });
    return;
  }

  try {
    const data = await UserDb.findOne({ _id: id });

    if (!data) {
      res.status(404).json({
        message: 'Usuario no encontrado',
      });
      return;
    }

    // remove password from response
    data.password = undefined;

    res.json({
      data,
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
// POST
// ----------------------------

export const postUser = async (req, res) => {
  const { body } = req;

  const { password } = body;

  const cryptedPassword = bcrypt.hashSync(password, 10);

  const newUser = new UserDb({
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
    if (err.message.includes('duplicate')) {
      res.status(400).json({
        message: `El usuario con username "${body.username}" ya existe`,
      });
      return;
    }

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
    const action = await UserDb.updateOne({ _id: id }, body);

    if (action.modifiedCount === 0) {
      res.status(404).json({
        message: 'Usuario no encontrado',
      });
      return;
    }

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

// ----------------------------
// DELETE
// ----------------------------

// Only change isActive property
export const deleteUser = async (req, res) => {
  const params = req.params || {};
  const { id } = params;

  if (!id) {
    res.status(400).json({
      message: 'Falta el id del usuario',
    });
    return;
  }

  try {
    const action = await UserDb.updateOne(
      {
        _id: id,
      },
      {
        isActive: false,
      },
    );

    if (action.matchedCount === 0) {
      res.status(404).json({
        message: 'Usuario no encontrado',
      });
      return;
    }

    res.json({
      message: 'Usuario eliminado exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
};
