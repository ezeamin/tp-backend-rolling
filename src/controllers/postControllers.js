import UserDb from '../models/UserSchema';

export const postUser = async (req, res) => {
  const body = req.body;

  const newUser = new UserDb({
    id: body.id,
    name: body.name,
    lastName: body.lastName,
    isActive: body.isActive,
  });

  try {
    const result = await newUser.save();

    res.json({
      message: 'Usuario creado exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      message: 'ERROR: ' + err,
    });
  }
};
