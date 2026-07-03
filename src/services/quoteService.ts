import { getEyunService } from "./eyunService"
import { sendMessageToCoze } from "./cozeService"

interface IncomingMessage {
    msgId: string
    fromWxId: string
    toWxId: string
    content: string
    msgType: number
    wId: string
}

/**
 * Process incoming webhook message and auto-reply using Coze AI
 */
export const processIncomingMessage = async (message: IncomingMessage): Promise<void> => {
    const { fromWxId, content, msgType, wId } = message

    // Only process text messages
    if (msgType !== 1) {
        console.log(`[Webhook] Skipping non-text message type: ${msgType}`)
        return
    }

    console.log(`[Quote] Processing message from ${fromWxId}: ${content}`)

    if (!wId) {
        console.log("[Quote] No wId provided in webhook")
        return
    }

    try {
        console.log("------------ aiResponse ------------")
        const aiResponse = await sendMessageToCoze(content, fromWxId)
        if (aiResponse) {
            console.log("------------ getEyunService ------------")
            const eyun = getEyunService()
            await eyun.sendText({ wId, wcId: fromWxId, content: aiResponse })
            console.log(`[Quote] Sent Coze reply to ${fromWxId}: ${aiResponse}`)
        } else {
            console.log("[Quote] Coze failed, notifying customer to retry")
            const eyun = getEyunService()
            await eyun.sendText({ wId, wcId: fromWxId, content: "Sorry, the system is busy. Please try again in a few seconds. Thank you!" })
        }
    } catch (error) {
        console.error(`[Quote] Failed to get Coze response:`, error)
    }
}

