import { getEyunService } from "./eyunService"
import { sendMessageToCoze } from "./cozeService"
import { getOpenClawService } from "./openclawService"
import { chatHistory } from "../models"
import { isWhitelisted } from "../config/whitelist"

interface IncomingMessage {
    msgId: string
    fromWxId: string
    toWxId: string
    content: string
    wId: string
    nickName: string
}

interface IncomingGroupMessage {
    msgId: string
    fromWxId: string
    chatRoomId: string
    content: string
    wId: string
    nickName: string
}

/**
 * Process incoming webhook message and auto-reply using Coze AI
 * NOTE: Duplicate check is done in webhookController before calling this
 */
export const processIncomingMessage = async (message: IncomingMessage): Promise<void> => {
    const { msgId, fromWxId, content, wId, nickName } = message

    // Only process text messages

    console.log(`[Quote] Processing message from ${fromWxId}: ${content}`)

    if (!wId) {
        console.log("[Quote] No wId provided in webhook")
        return
    }

    try {
        // Mark as pending before calling Coze
        // await chatHistory.create({
        //     msgId,
        //     wcId: fromWxId,
        //     fromWxId,
        //     content,
        // })

        let aiResponse: string | null = null

        if (isWhitelisted(fromWxId)) {
            // User is in whitelist → use OpenClaw
            console.log(`[Quote] ${fromWxId} is in whitelist, using OpenClaw`)
            const openclaw = getOpenClawService()
            aiResponse = await openclaw.chatWithContext(nickName, content)
        } else {
            // User is not in whitelist → use Coze
            console.log(`[Quote] ${fromWxId} is not in whitelist, using Coze`)
            aiResponse = await sendMessageToCoze(content, fromWxId)
        }
        if (aiResponse) {
            console.log(`[Quote] AI response: ${aiResponse}`)
            const eyun = getEyunService()
            await eyun.sendText({ wId, wcId: fromWxId, content: aiResponse })
            console.log(`[Quote] Sent reply to ${fromWxId}: ${aiResponse}`)
            await chatHistory.create({ msgId, wId, fromWxId, content, reply: aiResponse })
        } else {
            console.log("[Quote] AI failed, notifying customer to retry")
            const errorMessage = "Sorry, the system is busy. Please try again in a few seconds. Thank you!"
            await chatHistory.create({ msgId, wId, fromWxId, content, reply: errorMessage })
        }
    } catch (error) {
        console.error(`[Quote] Failed to process message:`, error)
        const errorMessage = "Sorry, the system is busy. Please try again in a few seconds. Thank you!"
        if (isWhitelisted(fromWxId)) {
            console.log(`[Quote] ${fromWxId} is in whitelist, sending error message to OpenClaw`)
        } else {
            console.log(`[Quote] ${fromWxId} is not in whitelist, sending error message to Coze`)
        }
        const eyun = getEyunService()
        await eyun.sendText({ wId, wcId: fromWxId, content: errorMessage })
        await chatHistory.create({ msgId, wId, fromWxId, content, reply: errorMessage })
    }
}

/**
 * Process incoming group message when bot is mentioned
 * Sends reply to group with @mention to the sender
 */
export const processIncomingGroupMessage = async (message: IncomingGroupMessage): Promise<void> => {
    const { msgId, fromWxId, chatRoomId, content, wId, nickName } = message

    console.log(`[Quote] Processing group message from ${fromWxId} in ${chatRoomId}: ${content}`)

    if (!wId) {
        console.log("[Quote] No wId provided in webhook")
        return
    }

    try {
        let aiResponse: string | null = null

        if (isWhitelisted(fromWxId)) {
            console.log(`[Quote] ${fromWxId} is in whitelist, using OpenClaw`)
            const openclaw = getOpenClawService()
            aiResponse = await openclaw.chatWithContext(nickName, content)
        } else {
            console.log(`[Quote] ${fromWxId} is not in whitelist, using Coze`)
            aiResponse = await sendMessageToCoze(content, fromWxId)
        }

        if (aiResponse) {
            console.log(`[Quote] AI response: ${aiResponse}`)
            const eyun = getEyunService()
            // Send to group with @mention to the sender
            await eyun.sendText({
                wId,
                wcId: chatRoomId,
                content: `@${nickName} ${aiResponse}`,
                at: fromWxId,
            })
            console.log(`[Quote] Sent reply to group ${chatRoomId}: ${aiResponse}`)
            await chatHistory.create({ msgId, wId, fromWxId, content, reply: aiResponse })
        } else {
            console.log("[Quote] AI failed, notifying customer to retry")
            const errorMessage = "Sorry, the system is busy. Please try again in a few seconds. Thank you!"
            await chatHistory.create({ msgId, wId, fromWxId, content, reply: errorMessage })
        }
    } catch (error) {
        console.error(`[Quote] Failed to process group message:`, error)
        const errorMessage = "Sorry, the system is busy. Please try again in a few seconds. Thank you!"
        const eyun = getEyunService()
        await eyun.sendText({
            wId,
            wcId: chatRoomId,
            content: `@${nickName} ${errorMessage}`,
            at: fromWxId,
        })
        await chatHistory.create({ msgId, wId, fromWxId, content, reply: errorMessage })
    }
}
