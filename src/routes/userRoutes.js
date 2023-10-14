import express from 'express';

import { getUsers, postUser } from '../controllers/userControllers.js';

import validateBody from '../middlewares/validateBody.js';

import {
  post_userSchema,
  put_userSchema,
} from '../helpers/validationSchemas/userSchemas.js';

const routerUsers = express.Router();

// GET -----------
routerUsers.get('/users', getUsers);

// POST -----------
routerUsers.post(
  '/user',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

// PUT -----------
routerUsers.put(
  '/user',
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  postUser,
);

export default routerUsers;
