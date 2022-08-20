import express, { json } from "express";
import bodyParser from "body-parser";
const app = express();
import auth from "./api/auth.js";
import user from "./api/user.js"
import pkg from 'mongoose';
const { connect } = pkg;
import authorize from "./controllers/authorization.js"

var mongoDB =
  "mongodb+srv://vishalcs106:1sj09cs106@cluster0.irnkdpf.mongodb.net/pirat3?retryWrites=true&w=majority";
connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("success");
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorixation"
      );
      next();
    });
    app.use(json({ extended: false }));

    app.use("/api/auth", auth);
    app.use("/api/user", authorize(), user)
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
