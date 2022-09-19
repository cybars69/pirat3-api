import dotenv from "dotenv"
dotenv.config()

import message from "../models/message.js"
import bounty from "../models/bounty.js"
import application from "../models/application.js"

const pageSize = 10

export async function newMessage(req, res) {
    const { applicationId, sender, content } = req.body
    if (!applicationId)
        return res.json({ success: false, message: "Please provide an application ID" }).send()

    console.log(applicationId)

    application.findOne({ _id: applicationId }).then(response => {
        console.log(response)
        if (!response)
            return res.json({ success: false, message: "Application ID not found" }).send()

        const newMessage = new message({ applicationId, sender, content })
        newMessage.save().then(response => {
            console.log(response)

            return res.json({ success: true, message: "Message sent" }).send()

        }).catch(e => {
            console.log(e)
            return res.json({ success: false, message: "Server Error" }).send()
        })
    })
}

export async function allMessagesByApplicationId(req, res) {
    const { user } = req.user
    const { applicationId } = req.body

    try {

        const { bountyId, applicantId } = await application.findOne({ _id: applicationId })

        if (!bountyId)
            return res.json({ success: false, message: "You do not exist" }).send()

        let access = false
        if (applicantId === user)
            access = true
        else {
            const { createdBy } = await bounty.findOne({ _id: bountyId }).select({ createdBy: 1 })
            if (createdBy === user)
                access = true
        }

        if (!access)
            return res.json({ success: false, message: "You do not have access" }).send()

        message.find({ applicationId }).select({ _id: 0 }).then(response => {
            return res.json({ success: true, message: "Fetched all messages in this thread", data: response }).send()
        })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Server Error" }).send()
    }
}

export async function limitedMessagesById(req, res) {
    const { user } = req.user
    const { applicationId } = req.body

    const { pageNum } = req.params

    // res.send(pageNum)

    try {
        const { bountyId, applicantId } = await application.findOne({ _id: applicationId })
        if (!bountyId)
            return res.json({ success: false, message: "You do not exist" }).send()

        let access = false
        if (applicantId === user)
            access = true
        else {
            const { createdBy } = await bounty.findOne({ _id: bountyId }).select({ createdBy: 1 })
            if (createdBy === user)
                access = true
        }

        if (!access)
            return res.json({ success: false, message: "You do not have access" }).send()

        message.find({ applicationId }).skip((Number(pageNum)) * pageSize).limit(pageSize)
            .select({ _id: 0 }).then(response => {

                if (response && !response.length)
                    return res.json({ success: true, message: `No messages in this thread beyond this point` }).send()

                return res.json({ success: true, message: `Fetched messages from page ${pageNum}`, data: response }).send()
            })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Server Error" }).send()
    }
}