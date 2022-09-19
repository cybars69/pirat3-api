import express, { json } from "express";
const app = express();
import pkg from 'mongoose';
const { connect } = pkg;

import authorize from "./middleware/authorization.js"

import auth from "./api/auth.js";
import user from "./api/user.js"
import ship from "./api/ship.js"
import bounty from "./api/bounty.js"
import application from "./api/application.js"
import message from "./api/message.js"

connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  // connect(process.env.MONGODB_ACC, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("success");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });
    app.use(json({ extended: false }));

    app.use("/api/auth", auth);
    app.use("/api/user", authorize, user)
    app.use("/api/ship", authorize, ship)
    app.use("/api/bounty", authorize, bounty)
    app.use("/api/application", authorize, application)
    app.use("/api/message", authorize, message)

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
