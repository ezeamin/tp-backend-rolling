import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

const isAuthenticated = (req, res, next) => {
  const { headers } = req;
  const authHeader = headers.authorization; // string

  if (!authHeader) {
    res.status(401).json({
      message: 'Token no valido o expirado',
    });
    return;
  }

  // Separo el "Bearer" del token
  const token = authHeader.split(' ')[1];

  try {
    const tokenInfo = jwt.verify(token, secretKey);

    req.user = tokenInfo;

    // token valido
    next();
  } catch (err) {
    // token no valido
    res.status(401).json({
      message: 'Token no valido o expirado',
    });
  }
};

export default isAuthenticated;
