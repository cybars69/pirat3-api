import User from "../models/user.js"
import jwt from 'jsonwebtoken';


// export function update(req, res) {
// }

export function getUser(req, res){
  console.log("===="+req.body)
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
              console.log("Test ======="+decoded.user.user);

              res.status(200).send(decoded.user)
            } else{
              res.status(404).send("404 : Not Found");
            }
        })
      }
    });
}


//Update by using token
export function update(req, res){
  console.log("===="+req.body)
  const token = req.headers["authorization"];
  jwt.verify(token, "pirat3_jwt_secret_!@#$", function(err, decoded) {
        User.findOneAndUpdate({userId: decoded.user.userId},{$set: req.body}).then(result => {
            if(result) {
              res.status(200).send(decoded.user)
            } else{
              res.status(404).send("404 : Not Found");
            }
        })
      
    });
}

//Find by Id using params
export function getUserId(req, res){
  const token = req.headers["authorization"];
  jwt.verify(token, "pirat3_jwt_secret_!@#$", function(err, decoded) {
    User.findOne({userId: req.params.getuserbyid}).then(result => {
      if(result) {
        console.log("USER FOUND !!!!");
        res.status(200).send(decoded.user)
       } else{
        res.status(404).send("404 : Not Found");
      }
    })
  });
}
  
//update userrrr


