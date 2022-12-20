import UserDb from '../models/UserSchema';
import ProductsDb from '../models/ProductSchema';

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

export const getProducts = async (req, res) => {
  const data = await ProductsDb.find();

  res.json(data);
};

export const getProduct = async (req, res) => {
  // params es lo que viene dentro del endpoint como dato (ver ruta de endpoint)
  const params = req.params;
  const { id } = params;

  const data = await ProductsDb.findOne({
    //id: id,
    id,
  });

  res.json({
    data: data,
  });
};