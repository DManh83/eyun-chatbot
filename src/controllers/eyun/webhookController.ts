import { Request, Response } from "express"
import { getEyunService } from "../../services/eyunService"
import { processIncomingMessage } from "../../services/quoteService"

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

        // Map Eyun webhook format to IncomingMessage format
        if (messageData.data) {
            const mappedMessage = {
                fromWxId: messageData.data.fromUser,
                toWxId: messageData.data.toUser,
                msgId: String(messageData.data.msgId || messageData.id),
                content: messageData.data.content,
                msgType: messageData.messageType === "60001" ? 1 : 0,
                wId: messageData.data.wId,
            }
            await processIncomingMessage(mappedMessage)
        }

        res.json({ code: "1000", message: "ok" })
    } catch (error) {
        console.error("[Webhook] Error processing callback:", error)
        res.json({ code: "1000", message: "ok" }) // Always return ok to prevent retries
    }
}

