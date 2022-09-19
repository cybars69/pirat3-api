import { config } from 'dotenv';
config()

import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("401 : Unauthorized, No token");
  } else {
    const partToken = token.split(' ')[1]
    jwt.verify(partToken, process.env.JWT_AUTH, function (err, decoded) {
      if (err) {
        console.log(err)
        return res.status(401).send("401 : Unauthorized");
      } else {
        req.user = decoded
        next()
      }
    });
  }
};

