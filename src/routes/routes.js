import express from 'express';

import { getHome } from '../controllers/getControllers';

export const router = express.Router();

// path, callback a ejecutar cuando se haga esta peticion
// request, response
router.get('/', getHome);
