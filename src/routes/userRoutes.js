// import express from 'express';

// import {
//   deleteUser,
//   getUser,
//   getUsers,
//   postUser,
//   putUser,
// } from '../controllers/userControllers.js';

// import isAdmin from '../middlewares/isAdmin.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';
// import validateBody from '../middlewares/validateBody.js';

// import {
//   post_userSchema,
//   put_userSchema,
// } from '../helpers/validationSchemas/userSchemas.js';

// const routerUsers = express.Router();

// // GET -----------
// routerUsers.get('/', isAuthenticated, isAdmin, getUsers);
// routerUsers.get('/:id', isAuthenticated, getUser);

// // POST -----------
// routerUsers.post(
//   '/',
//   (req, res, next) => validateBody(req, res, next, post_userSchema),
//   postUser,
// );

// // PUT -----------
// routerUsers.put(
//   '/:id',
//   isAuthenticated,
//   (req, res, next) => validateBody(req, res, next, put_userSchema),
//   putUser,
// );

// // DELETE -----------
// routerUsers.delete('/:id', isAuthenticated, deleteUser);

// export default routerUsers;
