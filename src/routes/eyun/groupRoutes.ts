import { Router } from "express"
import {
    createChatroom,
    addChatRoomMember,
    inviteChatRoomMember,
    deleteChatRoomMember,
    quitChatRoom,
    modifyGroupName,
    scanJoinRoom,
    modifyGroupRemark,
    queryGroupMemberDetail,
    getChatRoomMember,
    getChatRoomMemberInfo,
    getChatRoomInfo,
    getGroupQrCode,
    setChatRoomAnnouncement,
    roomTodo,
    roomAppTodo,
    operateChatRoom,
} from "../../controllers/eyun/groupController"

const router = Router()

// Group Management
router.post("/createChatroom", createChatroom)
router.post("/addChatRoomMember", addChatRoomMember)
router.post("/inviteChatRoomMember", inviteChatRoomMember)
router.post("/deleteChatRoomMember", deleteChatRoomMember)
router.post("/quitChatRoom", quitChatRoom)

// Group Info
router.post("/modifyGroupName", modifyGroupName)
router.post("/scanJoinRoom", scanJoinRoom)
router.post("/modifyGroupRemark", modifyGroupRemark)
router.post("/queryGroupMemberDetail", queryGroupMemberDetail)
router.post("/getChatRoomMember", getChatRoomMember)
router.post("/getChatRoomMemberInfo", getChatRoomMemberInfo)
router.post("/getChatRoomInfo", getChatRoomInfo)
router.post("/getGroupQrCode", getGroupQrCode)
router.post("/setChatRoomAnnouncement", setChatRoomAnnouncement)
router.post("/roomTodo", roomTodo)
router.post("/roomAppTodo", roomAppTodo)
router.post("/operateChatRoom", operateChatRoom)

export default router

