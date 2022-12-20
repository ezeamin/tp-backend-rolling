import express from 'express';

import { postLogin } from '../controllers/postControllers';

export const routerAuth = express.Router();

routerAuth.post('/login', postLogin);
