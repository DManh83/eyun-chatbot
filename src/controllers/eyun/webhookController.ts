import { Request, Response } from "express"
import { getEyunService } from "../../services/eyunService"
import { processIncomingMessage } from "../../services/quoteService"
import { saveContact } from "../../services/contactService"
import { chatHistory } from "../../models"

export const setWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { httpUrl, type } = req.body
        const result = await eyun.setHttpCallbackUrl({ httpUrl, type: type || 2 })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const cancelWebhook = async (_req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const result = await eyun.cancelHttpCallbackUrl()
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

// Webhook endpoint to receive messages from Eyun
export const webhookCallback = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageData = req.body

        // Skip if message is from self (the bot itself)
        // if (messageData.data?.self === true) {
        //     console.log("[Webhook] Skipping message from self")
        //     res.json({ code: "1000", message: "ok" })
        //     return
        // }

        // Skip group messages (chatroom messages have @chatroom suffix or messageType starts with 85)
        const isGroupMessage =
            messageData.data?.userName?.includes("@chatroom") || messageData.messageType?.startsWith("85") || messageData.msgType === "GROUP_MODINFO"

        if (isGroupMessage) {
            console.log("[Webhook] Skipping group message")
            res.json({ code: "1000", message: "ok" })
            return
        }
        console.log("[Webhook] Processing message", messageData)

        // Map Eyun webhook format to IncomingMessage format
        if (messageData.data) {
            const msgId = String(messageData.data.msgId)
            const fromWxId = messageData.data.fromUser
            const content = messageData.data.content
            const wId = messageData.data.wId
            const msgType = messageData.messageType === "60001" ? 1 : 0
            let nickName = extractNickname(messageData.data.pushContent)

            // Get contact info and save user to database
            try {
                const contact = await saveContact(wId, fromWxId)
                // console.log("[Webhook] Contact", contact)
                if (contact) {
                    nickName = contact.nickName || nickName
                }
            } catch (err) {
                console.log("[Webhook] Failed to get contact, using pushContent nickname")
            }

            // Check duplicate by msgId
            const existing = await chatHistory.findOne({ where: { msgId } })
            if (existing) {
                console.log(`[Webhook] Message ${msgId} already processed, skipping`)
                res.json({ code: "1000", message: "ok" })
                return
            }

            if (msgType !== 1) {
                console.log(`[Webhook] Skipping non-text message type: ${msgType}`)
                return
            }

            const mappedMessage = {
                fromWxId,
                toWxId: messageData.data.toUser,
                msgId,
                content,
                wId,
                nickName: nickName || "",
            }
            await processIncomingMessage(mappedMessage)
        }

        res.json({ code: "1000", message: "ok" })
    } catch (error) {
        console.error("[Webhook] Error processing callback:", error)
        res.json({ code: "1000", message: "ok" }) // Always return ok to prevent retries
    }
}

/**
 * Extract nickname from pushContent
 * Format: "Bruce : 把这个改成我的微信昵称" -> "Bruce"
 */
function extractNickname(pushContent: string | undefined): string | undefined {
    if (!pushContent) return undefined
    const parts = pushContent.split(" : ")
    return parts.length > 1 ? parts[0] : undefined
}

