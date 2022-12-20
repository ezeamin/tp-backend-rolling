import express from 'express';
import { getUsers } from '../controllers/getControllers';

import { postUser } from '../controllers/postControllers';

export const routerUsers = express.Router();

// POST -----------
routerUsers.post('/user', postUser);

// GET -----------
routerUsers.get('/users', getUsers);
