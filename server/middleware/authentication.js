import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const jwtKey = process.env.JWT_KEY;


const authenticateAdmin = (req, res, next) => {
  let decoded;
  try {
    const token = req.body.token || req.headers.authorization.split(' ')[1] || req.headers.token;
    decoded = jwt.verify(token, jwtKey);
    req.body.token = decoded.dbEmail;
    console.log(decoded.dbEmail.isadmin);
  } catch (err) {
    return res.status(401).json({
      status: 401,
      success: false,
      error: 'Invalid Token'
    });
  }
  if (decoded.dbEmail.isadmin) {
    return next();
  }
  return res.status(403).json({
    status: 403,
    message: 'Access Unauthorized'
  });
};

const authenticateUser = (req, res, next) => {
  const token = req.body.token || req.headers.token || req.headers
    .authorization.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, jwtKey);
    req.body.token = decoded;
  } catch (err) {
    return res.status(401).json({
      status: 401,
      success: false,
      error: 'Authentication Failed, Invalid Token'
    });
  }
  return next();
};

export { authenticateUser, authenticateAdmin };
