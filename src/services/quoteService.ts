import { getEyunService } from "./eyunService"
import { sendMessageToCoze } from "./cozeService"
import { ProcessedMessage } from "../models"

interface IncomingMessage {
    msgId: string
    fromWxId: string
    toWxId: string
    content: string
    wId: string
}

/**
 * Process incoming webhook message and auto-reply using Coze AI
 * NOTE: Duplicate check is done in webhookController before calling this
 */
export const processIncomingMessage = async (message: IncomingMessage): Promise<void> => {
    const { msgId, fromWxId, content, wId } = message

    // Only process text messages

    console.log(`[Quote] Processing message from ${fromWxId}: ${content}`)

    if (!wId) {
        console.log("[Quote] No wId provided in webhook")
        return
    }

    try {
        // Mark as pending before calling Coze
        await ProcessedMessage.create({
            msgId,
            wId,
            fromWxId,
            content,
        })

        console.log("------------ aiResponse ------------")
        const aiResponse = await sendMessageToCoze(content, fromWxId)
        if (aiResponse) {
            console.log("------------ getEyunService ------------")
            const eyun = getEyunService()
            await eyun.sendText({ wId, wcId: fromWxId, content: aiResponse })
            console.log(`[Quote] Sent Coze reply to ${fromWxId}: ${aiResponse}`)

            // Update reply
            await ProcessedMessage.update({ reply: aiResponse }, { where: { msgId } })
        } else {
            console.log("[Quote] Coze failed, notifying customer to retry")
            const eyun = getEyunService()
            await eyun.sendText({ wId, wcId: fromWxId, content: "Sorry, the system is busy. Please try again in a few seconds. Thank you!" })
            // Leave reply as null so it can be retried
        }
    } catch (error) {
        console.error(`[Quote] Failed to get Coze response:`, error)
    }
}

