const validateBody = (req, res, next, schema) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ errors: error.details });
    return;
  }

  // Ningun error, seguir con la peticion
  next();
};

export default validateBody;
