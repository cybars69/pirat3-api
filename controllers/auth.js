import { nanoid } from "nanoid";
import ethUtil from 'ethereumjs-util';
import jwt from 'jsonwebtoken';

import Auth from "../models/auth.js";
import User from "../models/user.js"

export async function signMessage(req, res) {
  try {
    const { publicAddress } = req.body;
    const userInDb = await User.findOne({ publicAddress })
    if (userInDb) {
      return res.json({ success: true, nonce: userInDb.nonce }).send()
    }

    const nonce = nanoid(10);
    const userId = nanoid(7);
    const newUser = new User({
      userId,
      publicAddress,
      nonce
    })

    newUser.save().then(response => {
      return res.json({ success: true, nonce }).send()
    })
      .catch(e => {
        console.log(e)
        return res.json({ success: false }).send()
      })
  } catch (err) {
    console.log(err);
  }
}

export async function verify(req, res) {
  try {
    const { signature, message } = req.body
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
    const publicAddress = ethUtil.bufferToHex(addresBuffer);

    const filter = { publicAddress: address, signMessage: message, authStatus: "created" };
    const update = { authStatus: "verified" };

    await User.updateOne({ publicAddress }, { nonce: nanoid(10) })

    User.findOne({ publicAddress }).then(response => {
      if (!response)
        return res.json({ success: false, message: "Please try logging in again" }).send()


      jwt.sign({ user: response.userId }, process.env.JWT_AUTH, {}, function (err, token) {
        if (err == null) {
          res.json({ success: false, token: token });
        } else {
          console.log(err);
        }
      });
      return res.json({ success: true, nonce: userInDb.nonce }).send()

    })
  } catch (err) {
    console.log(err);
    res.status(500).send
  }
}
