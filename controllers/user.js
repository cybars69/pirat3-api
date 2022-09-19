import dotenv from "dotenv"
dotenv.config()
import User from "../models/user.js"

export function getUser(req, res) {
  const { user } = req.user
  // const { user, publicAddress } = user
  User.findOne({
    userId: user
  }).then(result => {
    if (result) {
      return res.status(200).send(result)
    } else {
      return res.status(404).send("404 : Not Found");
    }
  })
}

//Update by using token
export function update(req, res) {
  const decoded = req.user
  User.findOneAndUpdate({ userId: decoded.user.userId }, { $set: req.body }).then(result => {
    if (result) {
      return res.status(200).send(decoded.user)
    } else {
      return res.status(404).send("404 : Not Found");
    }
  })
}

//Find by Id using params
export function getUserId(req, res) {
  const decoded = req.user
  User.findOne({ userId: req.params.getuserbyid }).then(result => {
    if (result) {
      return res.status(200).send(decoded.user)
    } else {
      return res.status(404).send("404 : Not Found");
    }
  })
}
