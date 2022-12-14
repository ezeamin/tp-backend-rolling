import express from 'express';

import { getHome, getUsers } from '../controllers/getControllers';
import { postUser } from '../controllers/postControllers';

export const router = express.Router();

// path (endpoint), callback a ejecutar cuando se haga esta peticion
// request, response

// GET ---------------------------
router.get('/', getHome);
router.get('/users', getUsers);

// POST ---------------------------
router.post('/user', postUser);
