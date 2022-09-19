import dotenv from "dotenv"
dotenv.config()

import application from "../models/application.js"
import bounty from "../models/bounty.js"

export async function createApplication(req, res) {
    const { user } = req.user
    const body = req.body
    const newApplication = new application({ ...body, applicantId: user })
    newApplication.save().then(_ => {
        return res.json({ success: true, message: "Sucessfully applied", data: { ...body, applicantId: user } }).send()
    }).catch(err => {
        console.log(err)
        return res.json({ success: false, message: "Failed to appply" })
    })
}

export async function approveApplication(req, res) {
    const { user } = req.user
    const { id } = req.body
    application.findOne({ _id: id }).then(async (applicationDeets) => {
        if (!applicationDeets)
            return res.json({ success: false, message: "Application does not exist" }).send()
        const check_ = await bounty.findOne({ _id: applicationDeets.bountyId, createdBy: user })
        if (!check_)
            return res.json({ success: false, message: "You do not have access" }).send()
        application.findOneAndUpdate({ _id: id }, { status: 1 }, { new: 1 }).then(_ => {
            console.log(_)
            return res.json({ success: true, message: "Successfully Approved Application" }).send()
        })
    })
}

export async function rejectApplication(req, res) {
    const { user } = req.user
    const { id } = req.body
    application.findOne({ _id: id }).then(async (applicationDeets) => {
        if (!applicationDeets)
            return res.json({ success: false, message: "Application does not exist" }).send()
        const check = await bounty.findOne({ _id: applicationDeets.bountyId, createdBy: user })
        if (!check)
            return res.json({ success: false, message: "You do not have access" }).send()
        application.findOneAndUpdate({ _id: id }, { status: 2 }).then(_ => {
            console.log(_)
            return res.json({ success: true, message: "Successfully Rejected Application" }).send()
        })
    })
}

export async function getApplications(req, res) {
    const { user } = req.user
    const { bountyId } = req.body

    application.find({ bountyId }).select({ bountyId: 0, __v: 0 }).then(ownerDeets => {
        if (!ownerDeets || !ownerDeets.length)
            return res.json({ success: false, message: "You do not have access" }).send()

        console.log(ownerDeets)
        return res.json({ success: true, message: "Approval success" })

    })
}

export async function getApplicationById(req, res) {
    const { user } = req.user
    const { id } = req.body
    application.findOne({ _id: id }).select({ __v: 0, _id: 0 }).then(applicationDeets => {
        if (!applicationDeets)
            return res.json({ success: false, message: "Application does not exist" }).send()

        console.log(applicationDeets)
        return res.json({ success: true, message: "Application found", data: applicationDeets })

    })
}