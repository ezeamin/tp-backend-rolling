import Joi from 'joi';

// ----------------------------
// BODY
// ----------------------------

export const post_taskSchema = Joi.object({
  title: Joi.string().required().trim().min(3)
    .max(30)
    .messages({
      'string.empty': 'El campo "name" no puede estar vacio',
      'string.min': 'El campo "name" debe tener al menos 3 caracteres',
      'string.max': 'El campo "name" debe tener maximo 30 caracteres',
      'any.required': 'El campo "name" es obligatorio',
      '*': 'Revisa el campo "name"',
    }),
});

export const put_taskSchema = Joi.object({
  title: Joi.string().required().trim().min(3)
    .max(30)
    .messages({
      'string.empty': 'El campo "name" no puede estar vacio',
      'string.min': 'El campo "name" debe tener al menos 3 caracteres',
      'string.max': 'El campo "name" debe tener maximo 30 caracteres',
      '*': 'Revisa el campo "name"',
    }),
});

// ----------------------------
// PARAMS
// ----------------------------

export const get_params_taskSchema = Joi.object({
  value: Joi.string().required().trim().max(24)
    .messages({
      'string.empty': 'El parámetro "value" no puede estar vacio',
      'string.max': 'El parámetro "value" debe tener a lo sumo 24 caracteres',
      'any.required': 'El parámetro "value" es obligatorio',
      '*': 'Revisa el parámetro "value"',
    }),
});

export const put_params_taskSchema = Joi.object({
  id: Joi.string().required().trim().length(24)
    .messages({
      'string.empty': 'El parámetro "id" no puede estar vacio',
      'string.length': 'El parámetro "id" debe ser un id válido',
      'any.required': 'El parámetro "id" es obligatorio',
      '*': 'Revisa el parámetro "id"',
    }),
});

// Es igual al anterior
export const delete_params_taskSchema = put_params_taskSchema;
