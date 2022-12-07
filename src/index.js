import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//1- Inicializamos express
const app = express();

//2- Configuraciones del servidor
app.set('PORT', process.env.PORT || 5000);

//3- Middlewares
app.use(morgan('dev'));
app.use(cors());

//4- Rutas

//5- Loop del servidor
app.listen(app.get('PORT'), () => {
  console.log(`Servidor ejecutandose en ${app.get('PORT')}`);
});
