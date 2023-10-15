import express from 'express';

import {
  getProduct,
  getProducts,
  postProduct,
  deleteProduct,
  putProduct,
} from '../controllers/productControllers.js';

import isAdmin from '../middlewares/isAdmin.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import validateBody from '../middlewares/validateBody.js';

import {
  post_productSchema,
  put_productSchema,
} from '../helpers/validationSchemas/productSchemas.js';

const routerProducts = express.Router();

// path (endpoint), callback a ejecutar cuando se haga esta peticion
// request, response

// GET ---------------------------
routerProducts.get('/', getProducts);
routerProducts.get('/:id', getProduct);

// POST ---------------------------
routerProducts.post(
  '/',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, post_productSchema),
  postProduct,
);

// PUT ----------------------------
routerProducts.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, put_productSchema),
  putProduct,
);

// DELETE -------------------------
routerProducts.delete('/:id', isAuthenticated, isAdmin, deleteProduct);

export default routerProducts;
