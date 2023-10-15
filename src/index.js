import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// importamos la conexion a la DB
import './database/database.js';

import routerProducts from './routes/productsRoutes.js';
import routerAuth from './routes/authRoutes.js';
import routerUsers from './routes/userRoutes.js';

// 1- Inicializamos express
const app = express();

// 2- Configuraciones del servidor
const PORT = process.env.PORT || 5000;

// 3- Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // <==== Parsear el body como JSON

// 4- Rutas
app.use('/api/v1/products', routerProducts);
app.use('/api/v1/auth', routerAuth);
app.use('/api/v1/users', routerUsers);

// 5- Loop del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en puerto ${PORT}`);
});
