import jwt from 'jsonwebtoken';
import User from "../models/user.js"
export default () => {
  return (req, res, next) => {
    console.log("Auth mw")
    const token = req.headers["authorization"];
    console.log("token"+token)
    if (!token) {
      return res.status(401).send("401 : Unauthorized");
    } else {
    jwt.verify(token, "pirat3_jwt_secret_!@#$", function(err, decoded) {
        if(err)  {
          console.log(err)
          res.status(401).send("401 : Unauthorized");
        } else{
          console.log("Decoded "+JSON.stringify(decoded))
          console.log(decoded.user.userId)
          next()
        }
        
      });




      // admin
      //   .auth()
      //   .verifyIdToken(token)
      //   .then(() => {
      //     next();
      //   })
      //   .catch((err) => {
      //       console.log(err)
      //     res.status(401).send("401 : Unauthorized");
      //   });
    }
  };
};
