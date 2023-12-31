import BlogsModel from '../../models/BlogSchema.js';

// ----------------------------
// GET
// ----------------------------

// El "_" es un parámetro que no se usa (sería el req), pero que se pone para que no de error
export const getBlogs = async (_, res) => {
  try {
    const data = await BlogsModel.find({ isActive: true });

    // Devolvemos un objeto con la data para que siempre sea un objeto lo que viaja al FE
    res.json({
      data,
      message: data.length > 0 ? 'Blogs encontrados' : 'Listado vacío',
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};

export const getBlog = async (req, res) => {
  // params es lo que viene dentro del endpoint como dato (ver ruta de endpoint)
  const {
    params: { id },
  } = req;

  try {
    const data = await BlogsModel.findOne({ _id: id, isActive: true });

    res.json({
      data,
      message: data ? 'Blog encontrado' : 'Blog no encontrado',
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

export const postBlog = async (req, res) => {
  const { body } = req;

  const newProduct = new BlogsModel({
    title: body.title,
    'image-url': body['image-url'],
    content: body.content,
    isActive: true,
  });

  try {
    await newProduct.save();

    res.json({ data: null, message: 'Blog creado exitosamente' });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};

// ----------------------------
// PUT
// ----------------------------

export const putBlog = async (req, res) => {
  // Traemos el id y los datos del blog a actualizar
  const {
    params: { id },
    body,
  } = req;

  try {
    // filter,newData
    const action = await BlogsModel.updateOne({ _id: id }, body);

    if (action.modifiedCount === 0) {
      res.status(404).json({ data: null, message: 'Blog no encontrado' });
      return;
    }

    res.json({ data: null, message: 'Blog actualizado' });
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

export const deleteBlog = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const action = await BlogsModel.updateOne({ _id: id, isActive: true }, { isActive: false });

    if (action.modifiedCount === 0) {
      res.status(404).json({ data: null, message: 'Blog no encontrado' });
      return;
    }

    res.json({ data: null, message: 'Blog eliminado' });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: `ERROR: ${err}`,
    });
  }
};
