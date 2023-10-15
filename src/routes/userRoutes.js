import express from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/userControllers.js';

import validateBody from '../middlewares/validateBody.js';

import {
  post_userSchema,
  put_userSchema,
} from '../helpers/validationSchemas/userSchemas.js';

const routerUsers = express.Router();

// GET -----------
routerUsers.get('/', getUsers);
routerUsers.get('/:id', getUser);

// POST -----------
routerUsers.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

// PUT -----------
routerUsers.put(
  '/:id',
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  putUser,
);

// DELETE -----------
routerUsers.delete('/:id', deleteUser);

export default routerUsers;
