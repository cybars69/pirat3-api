import dotenv from "dotenv"
dotenv.config()

import ship from "../models/ship.js"

export async function createShip(req, res) {
    const { user } = req.user
    const body = req.body
    const newShip = new ship({ ...body, createdBy: user })
    newShip.save().then(_ => {
        return res.json({ success: true, message: "Sucessfully created a ship", data: { ...body, createdBy: user } }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to create a ship" })
    })
}

export async function getAllMyShips(req, res) {
    const { user } = req.user
    ship.find({ createdBy: user }).select({ _id: 1, name: 1 }).then(response => {
        return res.json({ success: true, message: "All ships owned by the current user", data: response }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to get all ships" })
    })
}

export async function getShipById(req, res) {
    const { user } = req.user
    const { id } = req.body
    ship.findOne({ _id: id, createdBy: user }).then(response => {
        if (!response)
            return res.json({ success: false, message: "You do not have access" }).send()
        return res.json({ success: true, message: "This ship's details by ID", data: response }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to get ship" })
    })
}

export async function deleteShipById(req, res) {
    const { user } = req.user
    const { id } = req.body
    ship.deleteOne({ _id: id, createdBy: user }).then(response => {
        if (!response)
            return res.json({ success: false, message: "You do not have access" }).send()
        if (response.deletedCount)
            return res.json({ success: true, message: "Ship has been deleted" }).send()
        return res.json({ success: false, message: "Ship does not exist" }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to delete ship" })
    })
}