import express from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/userControllers.js';

import isAdmin from '../middlewares/isAdmin.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import validateBody from '../middlewares/validateBody.js';

import {
  post_userSchema,
  put_userSchema,
} from '../helpers/validationSchemas/userSchemas.js';

const routerUsers = express.Router();

// GET -----------
routerUsers.get('/', isAuthenticated, getUsers);
routerUsers.get('/:id', isAuthenticated, getUser);

// POST -----------
routerUsers.post(
  '/',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

// PUT -----------
routerUsers.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  putUser,
);

// DELETE -----------
routerUsers.delete('/:id', isAuthenticated, isAdmin, deleteUser);

export default routerUsers;
