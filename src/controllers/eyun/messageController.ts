import { Request, Response } from "express"
import { getEyunService } from "../../services/eyunService"

// ===== Send Messages =====
export const sendText = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, content, at } = req.body
        const result = await eyun.sendText({ wId, wcId, content, at })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, content } = req.body
        const result = await eyun.sendImage({ wId, wcId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, path, fileName } = req.body
        const result = await eyun.sendFile({ wId, wcId, path, fileName })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendFileBase64 = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, base64, fileName } = req.body
        const result = await eyun.sendFileBase64({ wId, wcId, base64, fileName })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendVoice = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, content, length } = req.body
        const result = await eyun.sendVoice({ wId, wcId, content, length })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, path, thumbPath } = req.body
        const result = await eyun.sendVideo({ wId, wcId, path, thumbPath })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendLink = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, title, url, description, thumbUrl } = req.body
        const result = await eyun.sendLink({ wId, wcId, title, url, description, thumbUrl })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendNameCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, nameCardId } = req.body
        const result = await eyun.sendNameCard({ wId, wcId, nameCardId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendEmoji = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, imageMd5, imgSize } = req.body
        const result = await eyun.sendEmoji({ wId, wcId, imageMd5, imgSize })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendApplet = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, imgUrl, content } = req.body
        const result = await eyun.sendApplet({ wId, wcId, imgUrl, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const revokeMsg = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, msgId, newMsgId, createTime } = req.body
        const result = await eyun.revokeMsg({ wId, wcId, msgId, newMsgId, createTime })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

// ===== Forward Messages =====
export const sendRecvFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, content } = req.body
        const result = await eyun.sendRecvFile({ wId, wcId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendRecvImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, content } = req.body
        const result = await eyun.sendRecvImage({ wId, wcId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const sendRecvVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, content } = req.body
        const result = await eyun.sendRecvVideo({ wId, wcId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const forwardUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, wcId, content } = req.body
        const result = await eyun.forwardUrl({ wId, wcId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

// ===== Download =====
export const getMsgFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { msgId, wId, content } = req.body
        const result = await eyun.getMsgFile({ msgId, wId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getMsgImg = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, msgId, content, type } = req.body
        const result = await eyun.getMsgImg({ wId, msgId, content, type })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getMsgVoice = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, msgId, length, bufId, fromUser } = req.body
        const result = await eyun.getMsgVoice({ wId, msgId, length, bufId, fromUser })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getMsgEmoji = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, msgId, content } = req.body
        const result = await eyun.getMsgEmoji({ wId, msgId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const asynGetMsgVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, msgId, content } = req.body
        const result = await eyun.asynGetMsgVideo({ wId, msgId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getMsgVideoRes = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { id } = req.body
        const result = await eyun.getMsgVideoRes(id)
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

