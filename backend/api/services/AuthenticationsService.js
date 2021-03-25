const jwt = require('jsonwebtoken');

// sign with RSA SHA256
const SECRET = '151274e1dac60a5a6a41f554099df6dc3a2aac0c44bda152c596167e7662acf5';

const JWTIssuer = (payload, expiresIn) => {
//                                  ID en DB : Parametro recibido
  return jwt.sign(payload, SECRET, {expiresIn:expiresIn});
};
const JWTVerify = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  JWTIssuer,
  JWTVerify,
};