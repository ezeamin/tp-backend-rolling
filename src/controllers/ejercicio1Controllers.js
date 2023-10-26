import TasksDb from '../models/TaskSchema.js';

// ----------------------------
// GET
// ----------------------------

// El "_" es un parámetro que no se usa (sería el req), pero que se pone para que no de error
export const getTasks = async (_, res) => {
  try {
    const data = await TasksDb.find();

    // Devolvemos un objeto con la data para que siempre sea un objeto lo que viaja al FE
    res.json({
      data,
      message: data.length > 0 ? 'Tareas encontradas' : 'Listado vacío',
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

// Solucion 1 (más eficiente):
export const getFilteredTasks = async (req, res) => {
  // params es lo que viene dentro del endpoint como dato (ver ruta de endpoint)
  const { params } = req;
  const { value } = params;

  // Determinar si es un id o un texto
  const isId = value.length === 24;
  const query = isId
    ? { _id: value }
    : { title: { $regex: value, $options: 'i' } }; // utilizamos un regex para que encuentre coincidencias parciales

  try {
    // devuelve un arreglo vacio, o con uno o más elementos (con id devuelve 1)
    const data = await TasksDb.find(query);

    res.json({
      data,
      message: data.length > 0 ? 'Tareas encontradas' : 'Listado vacío',
    });
  } catch (err) {
    res.status(500).json({
      errors: { data: null, message: `ERROR: ${err}` },
    });
  }
};

// Solucion 2 (menos eficiente):
// export const getFilteredTasks = async (req, res) => {
//   // params es lo que viene dentro del endpoint como dato (ver ruta de endpoint)
//   const { params } = req;
//   const { value } = params;

//   // Determinar si es un id o un texto
//   const isId = value.length === 24;

//   try {
//     const data = await TasksDb.find({});

//     // filtrar dentro de los resultados
//     const filteredData = data.filter((task) => {
//       // toString() es necesario porque el _id es un objeto
//       if (isId) return task._id.toString() === value;
//       return task.title.includes(value);
//     });

//     res.json({
//       data: filteredData,
//     });
//   } catch (err) {
//     res.status(500).json({
//       errors: {
//         data: null,
//         message: `ERROR: ${err}`,
//       },
//     });
//   }
// };

// ----------------------------
// POST
// ----------------------------

export const postTask = async (req, res) => {
  const { body } = req;

  const newProduct = new TasksDb({
    title: body.title,
  });

  try {
    await newProduct.save();

    res.json({
      message: 'Tarea creada exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      errors: { data: null, message: `ERROR: ${err}` },
    });
  }
};

// ----------------------------
// PUT
// ----------------------------

export const putTask = async (req, res) => {
  // Traemos el id de la tarea a actualizar
  const { params } = req;
  const { id } = params;

  // Traemos el contenido (nuevos datos)
  const { body } = req;

  try {
    // filter,newData,options
    const action = await TasksDb.updateOne({ _id: id }, body, {
      new: true,
    });

    if (action.matchedCount === 0) {
      res.status(404).json({ data: null, message: 'Tarea no encontrada' });
      return;
    }

    res.json({
      message: 'Tarea actualizada',
    });
  } catch (err) {
    res.status(500).json({
      errors: { data: null, message: `ERROR: ${err}` },
    });
  }
};

// ----------------------------
// DELETE
// ----------------------------

export const deleteTask = async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    const action = await TasksDb.deleteOne({ _id: id });

    if (action.matchedCount === 0) {
      res.status(404).json({ data: null, message: 'Tarea no encontrada' });
      return;
    }

    res.json({ data: null, message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({
      errors: { data: null, message: `ERROR: ${err}` },
    });
  }
};
