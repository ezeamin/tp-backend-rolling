import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// importamos la conexion a la DB
import './database/database';

import { routerProducts } from './routes/productsRoutes';
import { routerAuth } from './routes/authRoutes';
import { routerUsers } from './routes/userRoutes';

//1- Inicializamos express
const app = express();

//2- Configuraciones del servidor
app.set('PORT', process.env.PORT || 5000);

//3- Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // <==== parse request body as JSON

//4- Rutas
app.use(routerProducts);
app.use(routerAuth);
app.use(routerUsers);

//5- Loop del servidor
app.listen(app.get('PORT'), () => {
  console.log(`Servidor ejecutandose en puerto ${app.get('PORT')}`);
});
