import express from 'express';

import {
  getHome,
  getProduct,
  getProducts,
  getUsers,
} from '../controllers/getControllers';
import { postProducts, postUser } from '../controllers/postControllers';
import { deleteProduct } from '../controllers/deleteController';
import { putProduct } from '../controllers/putControllers';

import { isAuthenticated } from '../middlewares/isAuthenticated';

export const routerProducts = express.Router();

// path (endpoint), callback a ejecutar cuando se haga esta peticion
// request, response

// GET ---------------------------
// router.get('/', getHome);
// router.get('/users', getUsers);
routerProducts.get('/products', getProducts);
routerProducts.get('/product/:id', getProduct);

// POST ---------------------------
// router.post('/user', postUser);
routerProducts.post('/product', isAuthenticated, postProducts);

// PUT ----------------------------
routerProducts.put('/product/:id', isAuthenticated, putProduct);

// DELETE -------------------------
routerProducts.delete('/product/:id', isAuthenticated, deleteProduct);
