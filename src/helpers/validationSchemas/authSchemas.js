import Joi from 'joi';

export const post_authSchema = Joi.object({
  username: Joi.string().required().min(3).max(25)
    .messages({
      'string.empty': 'El campo "username" no puede estar vacio',
      'string.min': 'El campo "username" debe tener al menos 3 caracteres',
      'string.max': 'El campo "username" debe tener maximo 25 caracteres',
      'any.required': 'El campo "username" es obligatorio',
      '*': 'Revisa el campo "username"',
    }),
  password: Joi.string().required().min(3).max(25)
    .messages({
      'string.empty': 'El campo "password" no puede estar vacio',
      'string.min': 'El campo "password" debe tener al menos 3 caracteres',
      'string.max': 'El campo "password" debe tener maximo 25 caracteres',
      'any.required': 'El campo "password" es obligatorio',
      '*': 'Revisa el campo "password"',
    }),
});
