import User from "../models/user.js"
import jwt from 'jsonwebtoken';

export function update(req, res) {
}

export function getUser(req, res){
  const token = req.headers["authorization"];
  jwt.verify(token, "pirat3_jwt_secret_!@#$", function(err, decoded) {
    if(err)  {
      console.log(err)
      res.status(401).send("401 : Unauthorized");
    } else{
      console.log("Decoded "+JSON.stringify(decoded))
      console.log(decoded.user.userId)
      User.findOne({userId: decoded.user.userId, 
        publicAddress: decoded.user.publicAddress}).then(result => {
            if(result) {
              res.status(200).send(decoded.user)
            } else{
              res.status(404).send("404 : Not Found");
            }
        })
      }
    });
}

export function updateUser(req, res){

}