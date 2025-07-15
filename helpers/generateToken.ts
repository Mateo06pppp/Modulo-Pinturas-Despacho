import jwt from 'jsonwebtoken';

const generateToken = (properties: any, minutes: number) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT secret key is not defined in the .env file");
  }

  return jwt.sign(
  properties, // Sin añadir `exp` manualmente
  secretKey,
  { expiresIn: '2h' } // 2 horas (también vale '120m' o '7200s')
);
};

export default generateToken;