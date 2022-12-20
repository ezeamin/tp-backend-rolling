import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export const isAuthenticated = (req, res, next) => {
  const headers = req.headers;
  const authHeader = headers.authorization; //string
  const token = authHeader.split(' ')[1];

  const isValid = jwt.verify(token, secretKey);

  if (!isValid) {
    res.status(403).json({
      message: 'Token no valido o expirado',
    });
    return;
  }

  //token valido
  next();
};
