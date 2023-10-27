import Joi from 'joi';

// ----------------------------
// BODY
// ----------------------------

export const post_colorSchema = Joi.object({
  name: Joi.string().required().trim().min(3)
    .max(30)
    .messages({
      'string.empty': 'El campo "name" no puede estar vacio',
      'string.min': 'El campo "name" debe tener al menos 3 caracteres',
      'string.max': 'El campo "name" debe tener maximo 30 caracteres',
      'any.required': 'El campo "name" es obligatorio',
      '*': 'Revisa el campo "name"',
    }),
  hex: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(9)
    .uppercase()
    .regex(/^#([A-F0-9]{6,8})$/i)
    .messages({
      'string.empty': 'El campo "hex" no puede estar vacio',
      'string.min': 'El campo "hex" debe tener al menos 3 caracteres',
      'string.max': 'El campo "hex" debe tener maximo 9 caracteres',
      'string.pattern.base': 'El campo "hex" debe ser un color hexadecimal',
      'any.required': 'El campo "hex" es obligatorio',
      '*': 'Revisa el campo "hex"',
    }),
  rgb: Joi.string()
    .trim()
    .required()
    .regex(
      /^rgb\((?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]))\)$/,
    )
    .messages({
      'string.empty': 'El campo "rgb" no puede estar vacio',
      'string.pattern.base':
        'El campo "rgb" debe ser un color rgb con el formato rgb(x,y,z)',
      'any.required': 'El campo "rgb" es obligatorio',
      '*': 'Revisa el campo "rgb"',
    }),
});

export const put_colorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30)
    .messages({
      'string.empty': 'El campo "name" no puede estar vacio',
      'string.min': 'El campo "name" debe tener al menos 3 caracteres',
      'string.max': 'El campo "name" debe tener maximo 30 caracteres',
      'any.required': 'El campo "name" es obligatorio',
      '*': 'Revisa el campo "name"',
    }),
  hex: Joi.string()
    .trim()
    .min(3)
    .max(9)
    .uppercase()
    .regex(/^#([A-F0-9]{6,8})$/i)
    .messages({
      'string.empty': 'El campo "hex" no puede estar vacio',
      'string.min': 'El campo "hex" debe tener al menos 3 caracteres',
      'string.max': 'El campo "hex" debe tener maximo 9 caracteres',
      'string.pattern.base': 'El campo "hex" debe ser un color hexadecimal',
      'any.required': 'El campo "hex" es obligatorio',
      '*': 'Revisa el campo "hex"',
    }),
  rgb: Joi.string()
    .trim()
    .regex(
      /^rgb\((?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]), ?)(?:([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5]))\)$/,
    )
    .messages({
      'string.empty': 'El campo "rgb" no puede estar vacio',
      'string.pattern.base':
        'El campo "rgb" debe ser un color rgb con el formato rgb(x,y,z)',
      'any.required': 'El campo "rgb" es obligatorio',
      '*': 'Revisa el campo "rgb"',
    }),
}).custom((value, helpers) => {
  // At least one field
  const { name, hex, rgb } = value;

  if (!name && !hex && !rgb) {
    return helpers.message('Al menos un campo debe estar presente en el body para modificar el color');
  }

  return true;
});

// ----------------------------
// PARAMS
// ----------------------------

export const get_params_colorSchema = Joi.object({
  id: Joi.string().required().trim().length(24)
    .messages({
      'string.empty': 'El parámetro "id" no puede estar vacio',
      'string.length': 'El parámetro "id" debe ser un id válido',
      'any.required': 'El parámetro "id" es obligatorio',
      '*': 'Revisa el parámetro "id"',
    }),
});

// Son iguales al anterior
export const put_params_colorSchema = get_params_colorSchema;
export const delete_params_colorSchema = get_params_colorSchema;
