import express from 'express';

import {
  getBlog,
  getBlogs,
  postBlog,
  deleteBlog,
  putBlog,
} from '../controllers/ejercicio5/blogsControllers.js';
import {
  getUser,
  getUsers,
  postUser,
  deleteUser,
  putUser,
} from '../controllers/ejercicio5/usersControllers.js';
import { postLogin } from '../controllers/ejercicio5/authControllers.js';

import isAuthenticated from '../middlewares/isAuthenticated.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateBody from '../middlewares/validateBody.js';
import validateParams from '../middlewares/validateParams.js';

import {
  delete_params_blogSchema,
  get_params_blogSchema,
  post_blogSchema,
  put_blogSchema,
  put_params_blogSchema,
} from '../helpers/validationSchemas/blogSchemas.js';

import {
  delete_params_userSchema,
  get_params_userSchema,
  post_userSchema,
  put_userSchema,
  put_params_userSchema,
} from '../helpers/validationSchemas/userSchemas.js';

import { post_authSchema } from '../helpers/validationSchemas/authSchemas.js';

const routerEjercicio5 = express.Router();

// ----------------------------
// BLOGS
// ----------------------------

// GET ---------------------------
routerEjercicio5.get('/', getBlogs);
routerEjercicio5.get(
  '/:id',
  (req, res, next) => validateParams(req, res, next, get_params_blogSchema),
  getBlog,
);

// POST ---------------------------
routerEjercicio5.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_blogSchema),
  postBlog,
);

// PUT ----------------------------
routerEjercicio5.put(
  '/:id',
  (req, res, next) => validateParams(req, res, next, put_params_blogSchema),
  (req, res, next) => validateBody(req, res, next, put_blogSchema),
  putBlog,
);

// DELETE -------------------------
routerEjercicio5.delete(
  '/:id',
  (req, res, next) => validateParams(req, res, next, delete_params_blogSchema),
  deleteBlog,
);

// ----------------------------
// USERS
// ----------------------------

// GET -----------
routerEjercicio5.get('/', isAuthenticated, isAdmin, getUsers);
routerEjercicio5.get(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateParams(req, res, next, get_params_userSchema),
  getUser,
);

// POST -----------
routerEjercicio5.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

// PUT -----------
routerEjercicio5.put(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateParams(req, res, next, put_params_userSchema),
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  putUser,
);

// DELETE -----------

routerEjercicio5.delete(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateParams(req, res, next, delete_params_userSchema),
  deleteUser,
);

// ----------------------------
// AUTH
// ----------------------------

// POST -----------
routerEjercicio5.post(
  '/login',
  (req, res, next) => validateBody(req, res, next, post_authSchema),
  postLogin,
);

export default routerEjercicio5;
