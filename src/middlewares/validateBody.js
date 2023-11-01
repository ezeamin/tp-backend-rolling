const validateBody = (req, res, next, schema) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      data: null,
      message: error.details[0].message,
    });
    return;
  }

  // Ningun error, seguir con la peticion
  next();
};

export default validateBody;
