import ProductsDb from '../models/ProductSchema.js';

import { generateRandomId } from '../helpers/helpers.js';

// ----------------------------
// GET
// ----------------------------

export const getProducts = async (req, res) => {
  const data = await ProductsDb.find();

  res.json(data);
};

export const getProduct = async (req, res) => {
  // params es lo que viene dentro del endpoint como dato (ver ruta de endpoint)
  const params = req.params || {};
  const { id } = params;

  if (!id) {
    res.status(400).json({
      message: 'Falta el id del producto',
    });
    return;
  }

  const data = await ProductsDb.findOne({
    id,
  });

  res.json({
    data,
  });
};

// ----------------------------
// POST
// ----------------------------

export const postProduct = async (req, res) => {
  const { body } = req;

  const newProduct = new ProductsDb({
    id: generateRandomId(),
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
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
};

// ----------------------------
// PUT
// ----------------------------

export const putProduct = async (req, res) => {
  // Traemos el id del producto a actualizar
  const params = req.params || {};
  const { id } = params;

  if (!id) {
    res.status(400).json({
      message: 'Falta el id del producto',
    });
    return;
  }

  // Traemos el contenido (nuevos datos)
  const { body } = req;

  try {
    // filter,newData,options
    const updated = await ProductsDb.findOneAndUpdate({ id }, body, {
      new: true,
    });

    res.json({
      message: 'Producto actualizado',
      updatedProduct: updated,
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

export const deleteProduct = async (req, res) => {
  const params = req.params || {};
  const { id } = params;

  if (!id) {
    res.status(400).json({
      message: 'Falta el id del producto',
    });
    return;
  }

  try {
    const deleted = await ProductsDb.findOneAndDelete({ id });

    res.json({
      message: 'Producto eliminado',
      deletedProduct: deleted,
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
};
