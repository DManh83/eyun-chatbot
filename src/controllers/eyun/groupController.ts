import { Request, Response } from "express"
import { getEyunService } from "../../services/eyunService"

// ===== Group Management =====
export const createChatroom = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, userList } = req.body
        const result = await eyun.createChatroom({ wId, userList })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const addChatRoomMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, userList } = req.body
        const result = await eyun.addChatRoomMember({ wId, chatRoomId, userList })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const inviteChatRoomMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, userList } = req.body
        const result = await eyun.inviteChatRoomMember({ wId, chatRoomId, userList })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const deleteChatRoomMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, userList } = req.body
        const result = await eyun.deleteChatRoomMember({ wId, chatRoomId, userList })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const quitChatRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId } = req.body
        const result = await eyun.quitChatRoom({ wId, chatRoomId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

// ===== Group Info =====
export const modifyGroupName = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, content } = req.body
        const result = await eyun.modifyGroupName({ wId, chatRoomId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const scanJoinRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, url, type } = req.body
        const result = await eyun.scanJoinRoom({ wId, url, type })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const queryGroupMemberDetail = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, groupId, maxIndex } = req.body
        const result = await eyun.queryGroupMemberDetail({ wId, groupId, maxIndex })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getChatRoomMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId } = req.body
        const result = await eyun.getChatRoomMember({ wId, chatRoomId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getChatRoomMemberInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, userList } = req.body
        const result = await eyun.getChatRoomMemberInfo({ wId, chatRoomId, userList })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getChatRoomInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId } = req.body
        const result = await eyun.getChatRoomInfo({ wId, chatRoomId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const modifyGroupRemark = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, content } = req.body
        const result = await eyun.modifyGroupRemark({ wId, chatRoomId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const getGroupQrCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId } = req.body
        const result = await eyun.getGroupQrCode({ wId, chatRoomId })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const setChatRoomAnnouncement = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, content } = req.body
        const result = await eyun.setChatRoomAnnouncement({ wId, chatRoomId, content })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const roomTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, newMsgId, operType, sign } = req.body
        const result = await eyun.roomTodo({ wId, chatRoomId, newMsgId, operType, sign })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const roomAppTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, newMsgId, title, pagePath, userName, sendWcId, sign } = req.body
        const result = await eyun.roomAppTodo({ wId, chatRoomId, newMsgId, title, pagePath, userName, sendWcId, sign })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

export const operateChatRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const { wId, chatRoomId, wcId, type } = req.body
        const result = await eyun.operateChatRoom({ wId, chatRoomId, wcId, type })
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

