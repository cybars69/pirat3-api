import { nanoid } from "nanoid";
import ethUtil from 'ethereumjs-util';
import jwt from 'jsonwebtoken';

import Auth from "../models/auth.js";
import User from "../models/user.js"

export function signMessage(req, res) {
  // console.log(req.body);
  try {
    const address = req.body.publicAddress;
    const message = nanoid(5);
    const auth = new Auth({
      publicAddress: address,
      signMessage: message,
      status: "created",
    });
    auth
      .save()
      .then((result) => {
        res.send({ signMessage: message });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  } catch (err) {
    console.log(err);
  }
}

export function verify(req, res) {
  // console.log(req.body)
  try {
    const signature = req.body.signature;
    const message = req.body.message;
    const msgHex = ethUtil.bufferToHex(Buffer.from(message));
    const msgBuffer = ethUtil.toBuffer(msgHex);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signature);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);

    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addresBuffer = ethUtil.publicToAddress(publicKey);
    const address = ethUtil.bufferToHex(addresBuffer);

    //console.log("PK", address);
    const filter = { publicAddress: address, signMessage: message, authStatus: "created" };
    const update = { authStatus: "verified" };

    Auth.updateOne(
      filter, update
    ).then(result => {
      //console.log("Update Success");
      const uId = nanoid(7);
      const user = new User({
        userId: uId,
        publicAddress: address,
      });
      user.save().then(result => {
        jwt.sign({ user: uId }, process.env.JWT_AUTH, {}, function (err, token) {
          if (err == null) {
            //console.log(token);
            res.send({ token: token });
          } else {
            console.log(err);
          }

        });

      }).catch(err => {
        res.status(500).send
      })

    }).catch(err => {
      console.log(err);
      res.status(500).send()
    })
  } catch (err) {
    console.log(err);
    res.status(500).send
  }
}
