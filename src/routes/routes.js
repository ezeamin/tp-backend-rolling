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

export const router = express.Router();

// path (endpoint), callback a ejecutar cuando se haga esta peticion
// request, response

// GET ---------------------------
// router.get('/', getHome);
// router.get('/users', getUsers);
router.get('/products', getProducts);
router.get('/product/:id', getProduct);

// POST ---------------------------
// router.post('/user', postUser);
router.post('/product', postProducts);

// PUT ----------------------------
router.put('/product/:id', putProduct);

// DELETE -------------------------
router.delete('/product/:id', deleteProduct);
