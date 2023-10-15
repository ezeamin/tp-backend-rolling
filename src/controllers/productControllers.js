import ProductsDb from '../models/ProductSchema.js';

// ----------------------------
// GET
// ----------------------------

// El "_" es un parámetro que no se usa (sería el req), pero que se pone para que no de error
export const getProducts = async (_, res) => {
  try {
    const data = await ProductsDb.find();

    res.json(data);
  } catch (err) {
    res.status(500).json({
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
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

  try {
    const data = await ProductsDb.findOne({ _id: id });

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

export const postProduct = async (req, res) => {
  const { body } = req;

  const newProduct = new ProductsDb({
    name: body.name,
    price: body.price,
    description: body.description,
    image: body.image,
    isActive: true,
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
    const action = await ProductsDb.updateOne({ _id: id }, body, {
      new: true,
    });

    if (action.matchedCount === 0) {
      res.status(404).json({
        message: 'Producto no encontrado',
      });
      return;
    }

    res.json({
      message: 'Producto actualizado',
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
    const action = await ProductsDb.updateOne({ _id: id }, { isActive: false });

    if (action.matchedCount === 0) {
      res.status(404).json({
        message: 'Producto no encontrado',
      });
      return;
    }

    res.json({
      message: 'Producto eliminado',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        message: `ERROR: ${err}`,
      },
    });
  }
};
