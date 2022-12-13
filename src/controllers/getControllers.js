import UserDb from '../models/UserSchema';

export const getHome = (req, res) => {
  res.json({
    message: 'Hola mundo',
  });
};

export const getUsers = async (req, res) => {
  const data = await UserDb.find();

  res.json({
    data: data,
  });
};
