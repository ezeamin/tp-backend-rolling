import Joi from 'joi';

// ----------------------------
// BODY
// ----------------------------

export const post_blogSchema = Joi.object({
  title: Joi.string().required().trim().min(4)
    .max(60)
    .messages({
      'string.empty': 'El campo "title" no puede estar vacio',
      'string.min': 'El campo "title" debe tener al menos 4 caracteres',
      'string.max': 'El campo "title" debe tener maximo 60 caracteres',
      'any.required': 'El campo "title" es obligatorio',
      '*': 'Revisa el campo "title"',
    }),
  'image-url': Joi.string().required().trim().uri()
    .messages({
      'string.empty': 'El campo "image-url" no puede estar vacio',
      'string.uri': 'El campo "image-url" debe ser una url',
      'any.required': 'El campo "image-url" es obligatorio',
      '*': 'Revisa el campo "image-url"',
    }),
  content: Joi.string().required().trim().min(5)
    .max(3000)
    .messages({
      'string.empty': 'El campo "content" no puede estar vacio',
      'string.min': 'El campo "content" debe tener al menos 5 caracteres',
      'string.max': 'El campo "content" debe tener maximo 3000 caracteres',
      'any.required': 'El campo "content" es obligatorio',
      '*': 'Revisa el campo "content"',
    }),
});

// copy post validation but remove "required" option
export const put_blogSchema = Joi.object({
  title: Joi.string().trim().min(4).max(60)
    .messages({
      'string.empty': 'El campo "title" no puede estar vacio',
      'string.min': 'El campo "title" debe tener al menos 4 caracteres',
      'string.max': 'El campo "title" debe tener maximo 60 caracteres',
      'any.required': 'El campo "title" es obligatorio',
      '*': 'Revisa el campo "title"',
    }),
  'image-url': Joi.string().trim().uri().messages({
    'string.empty': 'El campo "image-url" no puede estar vacio',
    'string.uri': 'El campo "image-url" debe ser una url',
    'any.required': 'El campo "image-url" es obligatorio',
    '*': 'Revisa el campo "image-url"',
  }),
  content: Joi.string().trim().min(5).max(3000)
    .messages({
      'string.empty': 'El campo "content" no puede estar vacio',
      'string.min': 'El campo "content" debe tener al menos 5 caracteres',
      'string.max': 'El campo "content" debe tener maximo 3000 caracteres',
      'any.required': 'El campo "content" es obligatorio',
      '*': 'Revisa el campo "content"',
    }),
}).custom((value, helpers) => {
  // At least one field
  const { title, content } = value;
  const imageUrl = value['image-url']; // separado por ser un string con guiones

  if (!title && !imageUrl && !content) {
    return helpers.message('Al menos un campo debe estar presente en el body');
  }

  return true;
});

// ----------------------------
// PARAMS
// ----------------------------

export const get_params_blogSchema = Joi.object({
  id: Joi.string().required().trim().length(24)
    .messages({
      'string.empty': 'El parámetro "id" no puede estar vacio',
      'string.length': 'El parámetro "id" debe ser un id válido',
      'any.required': 'El parámetro "id" es obligatorio',
      '*': 'Revisa el parámetro "id"',
    }),
});

// Son iguales al anterior
export const put_params_blogSchema = get_params_blogSchema;
export const delete_params_blogSchema = put_params_blogSchema;
