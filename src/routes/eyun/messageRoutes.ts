import { Router } from "express"
import {
    sendText,
    sendImage,
    sendFile,
    sendFileBase64,
    sendVoice,
    sendVideo,
    sendLink,
    sendNameCard,
    sendEmoji,
    sendApplet,
    revokeMsg,
    sendRecvFile,
    sendRecvImage,
    sendRecvVideo,
    forwardUrl,
    getMsgFile,
    getMsgImg,
    getMsgVoice,
    getMsgEmoji,
    asynGetMsgVideo,
    getMsgVideoRes,
} from "../../controllers/eyun/messageController"

const router = Router()

// Send Messages
router.post("/sendText", sendText)
router.post("/sendImage", sendImage)
router.post("/sendFile", sendFile)
router.post("/sendFileBase64", sendFileBase64)
router.post("/sendVoice", sendVoice)
router.post("/sendVideo", sendVideo)
router.post("/sendLink", sendLink)
router.post("/sendNameCard", sendNameCard)
router.post("/sendEmoji", sendEmoji)
router.post("/sendApplet", sendApplet)
router.post("/revokeMsg", revokeMsg)

// Forward Messages (sendRecvFile, sendRecvImage, sendRecvVideo, sendRecvUrl)
router.post("/sendRecvFile", sendRecvFile)
router.post("/sendRecvImage", sendRecvImage)
router.post("/sendRecvVideo", sendRecvVideo)
router.post("/sendRecvUrl", forwardUrl)

// Download
router.post("/getMsgFile", getMsgFile)
router.post("/getMsgImg", getMsgImg)
router.post("/getMsgVoice", getMsgVoice)
router.post("/getMsgEmoji", getMsgEmoji)
router.post("/asynGetMsgVideo", asynGetMsgVideo)
router.post("/getMsgVideoRes", getMsgVideoRes)

export default router

