import Auth from "../models/auth.js";
import { nanoid } from "nanoid";
import { web3 } from "web3";
export function signMessage(req, res) {
  try {
    const address = req.body.publicAddress;
    const message = nanoid(5);
    const auth = new Auth({
      publicAddress: address,
      signMessage: message,
      status: "created",
    });
    console.log("Auth " + auth);
    auth
      .save()
      .then((result) => {
        console.log("Saved");
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
  try {
    const signature = req.body.publicAddress;
    const message = req.body.signMessage;
    web3.eth.personal.ecRecover(message, signature).then(res =>{

        const filter = { pubblicAddress: res, signMessage: message, authStatus: "created" };
        const update = { authStatus: "verified" };

        Auth.updateOne(
            filter, update
        ).then(res =>{

        }).catch(err =>{

        })
    })
  } catch (err) {
    console.log(err);
  }
}
