import dotenv from "dotenv"
dotenv.config()

import bounty from "../models/bounty.js"

export async function createBounty(req, res) {
    const { user } = req.user
    const body = req.body
    const newBounty = new bounty({ ...body, createdBy: user })

    newBounty.save().then(_ => {
        return res.json({ success: true, message: "Sucessfully created a bounty", data: { ...body, createdBy: user } }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to create a bounty" })
    })
}

export async function getAllBountiesByShipId(req, res) {
    const { shipId } = req.body
    bounty.find({ shipId }).select({ name: 1, desc: 1, status: 1, currency: 1, amount: 1 }).then(response => {
        return res.json({ success: true, message: "All bounties of current ship", data: response }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to get all bounties" })
    })
}

export async function deleteBounty(req, res) {
    const { user } = req.user
    const { id } = req.body
    bounty.deleteOne({ _id: id, createdBy: user }).then(response => {
        if (!response.deletedCount)
            return res.json({ success: false, message: "You do not have access to delete" }).send()
        return res.json({ success: true, message: "Deleted bounty" }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to get delete bounty" })
    })
}