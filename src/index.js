import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// importamos la conexion a la DB
import './database/database.js';

import routerEj1 from './routes/ejercicio1.js';
import routerEj3 from './routes/ejercicio3.js';
import routerEj5 from './routes/ejercicio5.js';

// 1- Inicializamos express
const app = express();

// 2- Configuraciones del servidor
const PORT = process.env.PORT || 5000;

// 3- Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // <==== Parsear el body como JSON

// 4- Rutas
app.use('/api/v1/ejercicio-1', routerEj1);
app.use('/api/v1/ejercicio-3', routerEj3);
app.use('/api/v1/ejercicio-5', routerEj5);

// 5- Loop del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en puerto ${PORT}`);
});
