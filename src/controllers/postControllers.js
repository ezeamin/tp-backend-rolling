import UserDb from '../models/UserSchema';
import ProductsDb from '../models/ProductSchema';
import { randomInteger } from '../helpers/random';
import { validateContent } from '../helpers/validateContent';
import { validateData } from '../helpers/validateData';

export const postUser = async (req, res) => {
  const body = req.body;

  const newUser = new UserDb({
    id: body.id,
    name: body.name,
    lastName: body.lastName,
    isActive: body.isActive,
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
  if(!validateData(body)){
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
