import express from 'express';

import {
  getFilteredTasks,
  getTasks,
  postTask,
  deleteTask,
  putTask,
} from '../controllers/ejercicio1Controllers.js';

import validateBody from '../middlewares/validateBody.js';
import validateParams from '../middlewares/validateParams.js';

import {
  post_taskSchema,
  put_taskSchema,
  put_params_taskSchema,
  get_params_taskSchema,
  delete_params_taskSchema,
} from '../helpers/validationSchemas/taskSchemas.js';

const routerTasks = express.Router();

// GET ---------------------------
routerTasks.get('/', getTasks);
routerTasks.get(
  '/:value',
  (req, res, next) => validateParams(req, res, next, get_params_taskSchema),
  getFilteredTasks,
);

// POST ---------------------------
routerTasks.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_taskSchema),
  postTask,
);

// PUT ----------------------------
routerTasks.put(
  '/:id',
  (req, res, next) => validateParams(req, res, next, put_params_taskSchema),
  (req, res, next) => validateBody(req, res, next, put_taskSchema),
  putTask,
);

// DELETE -------------------------
routerTasks.delete(
  '/:id',
  (req, res, next) => validateParams(req, res, next, delete_params_taskSchema),
  deleteTask,
);

export default routerTasks;
