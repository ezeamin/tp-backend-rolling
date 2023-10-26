import ColorsDb from '../models/ColorSchema.js';

// ----------------------------
// GET
// ----------------------------

// El "_" es un parámetro que no se usa (sería el req), pero que se pone para que no de error
export const getColors = async (_, res) => {
  try {
    const data = await ColorsDb.find();

    // Devolvemos un objeto con la data para que siempre sea un objeto lo que viaja al FE
    res.json({
      data,
      message: data.length > 0 ? 'Colores encontrados' : 'Listado vacío',
    });
  } catch (err) {
    res.status(500).json({
      errors: { data: null, message: `ERROR: ${err}` },
    });
  }
};

export const getColor = async (req, res) => {
  // params es lo que viene dentro del endpoint como dato (ver ruta de endpoint)
  const { params } = req;
  const { id } = params;

  try {
    const data = await ColorsDb.findOne({ _id: id });

    res.json({
      data,
      message: data ? 'Color encontrado' : 'Color no encontrado',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        data: null,
        message: `ERROR: ${err}`,
      },
    });
  }
};

// ----------------------------
// POST
// ----------------------------

export const postColor = async (req, res) => {
  const { body } = req;

  const newProduct = new ColorsDb({
    name: body.name,
    hex: body.hex,
    rgb: body.rgb,
  });

  try {
    await newProduct.save();

    res.json({ data: null, message: 'Color creado exitosamente' });
  } catch (err) {
    res.status(500).json({
      errors: {
        data: null,
        message: `ERROR: ${err}`,
      },
    });
  }
};

// ----------------------------
// PUT
// ----------------------------

export const putColor = async (req, res) => {
  // Traemos el id del color a actualizar
  const { params } = req;
  const { id } = params;

  // Traemos el contenido (nuevos datos)
  const { body } = req;

  try {
    // filter,newData,options
    const action = await ColorsDb.updateOne({ _id: id }, body, {
      new: true,
    });

    if (action.matchedCount === 0) {
      res.status(404).json({ data: null, message: 'Color no encontrado' });
      return;
    }

    res.json({ data: null, message: 'Color actualizado' });
  } catch (err) {
    res.status(500).json({
      errors: { data: null, message: `ERROR: ${err}` },
    });
  }
};

// ----------------------------
// DELETE
// ----------------------------

export const deleteColor = async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    const action = await ColorsDb.deleteOne({ _id: id });

    if (action.matchedCount === 0) {
      res.status(404).json({ data: null, message: 'Color no encontrado' });
      return;
    }

    res.json({ data: null, message: 'Color eliminado' });
  } catch (err) {
    res.status(500).json({
      errors: { data: null, message: `ERROR: ${err}` },
    });
  }
};
