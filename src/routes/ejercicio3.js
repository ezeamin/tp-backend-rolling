import express from 'express';

import {
  getColor,
  getColors,
  postColor,
  deleteColor,
  putColor,
} from '../controllers/ejercicio3Controllers.js';

import validateBody from '../middlewares/validateBody.js';
import validateParams from '../middlewares/validateParams.js';

import {
  delete_params_colorSchema,
  get_params_colorSchema,
  post_colorSchema,
  put_colorSchema,
  put_params_colorSchema,
} from '../helpers/validationSchemas/colorSchemas.js';

const routerColors = express.Router();

// GET ---------------------------
routerColors.get('/', getColors);
routerColors.get(
  '/:id',
  (req, res, next) => validateParams(req, res, next, get_params_colorSchema),
  getColor,
);

// POST ---------------------------
routerColors.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_colorSchema),
  postColor,
);

// PUT ----------------------------
routerColors.put(
  '/:id',
  (req, res, next) => validateParams(req, res, next, put_params_colorSchema),
  (req, res, next) => validateBody(req, res, next, put_colorSchema),
  putColor,
);

// DELETE -------------------------
routerColors.delete(
  '/:id',
  (req, res, next) => validateParams(req, res, next, delete_params_colorSchema),
  deleteColor,
);

export default routerColors;
