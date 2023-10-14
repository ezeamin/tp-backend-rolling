import Joi from 'joi';

export const post_userSchema = Joi.object({
  name: Joi.string().required().trim().min(3)
    .max(30)
    .messages({
      'string.empty': 'El campo "name" no puede estar vacio',
      'string.min': 'El campo "name" debe tener al menos 3 caracteres',
      'string.max': 'El campo "name" debe tener maximo 30 caracteres',
      'any.required': 'El campo "name" es obligatorio',
      '*': 'Revisa el campo "name"',
    }),
  lastname: Joi.string().required().trim().min(3)
    .max(30)
    .messages({
      'string.empty': 'El campo "lastname" no puede estar vacio',
      'string.min': 'El campo "lastname" debe tener al menos 3 caracteres',
      'string.max': 'El campo "lastname" debe tener maximo 30 caracteres',
      'any.required': 'El campo "lastname" es obligatorio',
      '*': 'Revisa el campo "lastname"',
    }),
  username: Joi.string().required().trim().min(3)
    .max(30)
    .messages({
      'string.empty': 'El campo "username" no puede estar vacio',
      'string.min': 'El campo "username" debe tener al menos 3 caracteres',
      'string.max': 'El campo "username" debe tener maximo 30 caracteres',
      'any.required': 'El campo "username" es obligatorio',
      '*': 'Revisa el campo "username"',
    }),
  password: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(30)
    .custom((value, helper) => {
      // should have at least one number, one letter and one special character
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

      if (!value.match(regex)) {
        return helper.message(
          'El campo "password" debe tener al menos un numero, una letra y un caracter especial',
        );
      }

      return true;
    })
    .messages({
      'string.empty': 'El campo "password" no puede estar vacio',
      'string.min': 'El campo "password" debe tener al menos 3 caracteres',
      'string.max': 'El campo "password" debe tener maximo 30 caracteres',
      'any.required': 'El campo "password" es obligatorio',
    }),
});

export const put_userSchema = post_userSchema;
