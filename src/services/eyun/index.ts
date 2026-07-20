// Base service
export { EyunBaseService } from "./eyunBaseService"

// Auth service
export { EyunAuthService } from "./eyunAuthService"

// Message service
export { EyunMessageService } from "./eyunMessageService"

// Forward service
export { EyunForwardService } from "./eyunForwardService"

// Download service
export { EyunDownloadService } from "./eyunDownloadService"

// Contact service
export { EyunContactService } from "./eyunContactService"

// Group service
export { EyunGroupService } from "./eyunGroupService"

// Webhook service
export { EyunWebhookService } from "./eyunWebhookService"

// Main EyunService for backward compatibility
import { EyunBaseService } from "./eyunBaseService"
import { EyunAuthService } from "./eyunAuthService"
import { EyunMessageService } from "./eyunMessageService"
import { EyunForwardService } from "./eyunForwardService"
import { EyunDownloadService } from "./eyunDownloadService"
import { EyunContactService } from "./eyunContactService"
import { EyunGroupService } from "./eyunGroupService"
import { EyunWebhookService } from "./eyunWebhookService"
import { EyunConfig, EyunResponse } from "../../types/eyun"

/**
 * Combined EyunService - aggregates all services for backward compatibility
 */
export class EyunService extends EyunBaseService {
    auth: EyunAuthService
    message: EyunMessageService
    forward: EyunForwardService
    download: EyunDownloadService
    contact: EyunContactService
    group: EyunGroupService
    webhook: EyunWebhookService

    constructor(config: EyunConfig) {
        super(config)
        this.auth = new EyunAuthService(config)
        this.message = new EyunMessageService(config)
        this.forward = new EyunForwardService(config)
        this.download = new EyunDownloadService(config)
        this.contact = new EyunContactService(config)
        this.group = new EyunGroupService(config)
        this.webhook = new EyunWebhookService(config)
    }

    // Expose legacy methods that delegate to sub-services
    async iPadLogin(params: Parameters<EyunAuthService["iPadLogin"]>[0]) {
        return this.auth.iPadLogin(params)
    }
    async getIPadLoginInfo(params: Parameters<EyunAuthService["getIPadLoginInfo"]>[0]) {
        return this.auth.getIPadLoginInfo(params)
    }
    async secondLogin(params: Parameters<EyunAuthService["secondLogin"]>[0]) {
        return this.auth.secondLogin(params)
    }
    async getHttpCallbackUrl() {
        return this.auth.getHttpCallbackUrl()
    }
    async logout(wId: string) {
        return this.auth.logout(wId)
    }

    async sendText(params: Parameters<EyunMessageService["sendText"]>[0]) {
        return this.message.sendText(params)
    }
    async sendImage(params: Parameters<EyunMessageService["sendImage"]>[0]) {
        return this.message.sendImage(params)
    }
    async sendFile(params: Parameters<EyunMessageService["sendFile"]>[0]) {
        return this.message.sendFile(params)
    }
    async sendFileBase64(params: Parameters<EyunMessageService["sendFileBase64"]>[0]) {
        return this.message.sendFileBase64(params)
    }
    async sendVoice(params: Parameters<EyunMessageService["sendVoice"]>[0]) {
        return this.message.sendVoice(params)
    }
    async sendVideo(params: Parameters<EyunMessageService["sendVideo"]>[0]) {
        return this.message.sendVideo(params)
    }
    async sendLink(params: Parameters<EyunMessageService["sendLink"]>[0]) {
        return this.message.sendLink(params)
    }
    async sendNameCard(params: Parameters<EyunMessageService["sendNameCard"]>[0]) {
        return this.message.sendNameCard(params)
    }
    async sendEmoji(params: Parameters<EyunMessageService["sendEmoji"]>[0]) {
        return this.message.sendEmoji(params)
    }
    async sendApplet(params: Parameters<EyunMessageService["sendApplet"]>[0]) {
        return this.message.sendApplet(params)
    }
    async sendGroupAt(params: Parameters<EyunMessageService["sendGroupAt"]>[0]) {
        return this.message.sendGroupAt(params)
    }
    async revokeMsg(params: Parameters<EyunMessageService["revokeMsg"]>[0]) {
        return this.message.revokeMsg(params)
    }

    async sendRecvFile(params: Parameters<EyunForwardService["sendRecvFile"]>[0]) {
        return this.forward.sendRecvFile(params)
    }
    async sendRecvImage(params: Parameters<EyunForwardService["sendRecvImage"]>[0]) {
        return this.forward.sendRecvImage(params)
    }
    async sendRecvVideo(params: Parameters<EyunForwardService["sendRecvVideo"]>[0]) {
        return this.forward.sendRecvVideo(params)
    }
    async forwardUrl(params: Parameters<EyunForwardService["forwardUrl"]>[0]) {
        return this.forward.forwardUrl(params)
    }

    async getMsgFile(params: Parameters<EyunDownloadService["getMsgFile"]>[0]) {
        return this.download.getMsgFile(params)
    }
    async getMsgImg(params: Parameters<EyunDownloadService["getMsgImg"]>[0]) {
        return this.download.getMsgImg(params)
    }
    async getMsgVoice(params: Parameters<EyunDownloadService["getMsgVoice"]>[0]) {
        return this.download.getMsgVoice(params)
    }
    async getMsgEmoji(params: Parameters<EyunDownloadService["getMsgEmoji"]>[0]) {
        return this.download.getMsgEmoji(params)
    }
    async asynGetMsgVideo(params: Parameters<EyunDownloadService["asynGetMsgVideo"]>[0]) {
        return this.download.asynGetMsgVideo(params)
    }
    async getMsgVideoRes(id: string) {
        return this.download.getMsgVideoRes(id)
    }

    async initAddressList(params: Parameters<EyunContactService["initAddressList"]>[0]) {
        return this.contact.initAddressList(params)
    }
    async queryFriendList(params: Parameters<EyunContactService["queryFriendList"]>[0]) {
        return this.contact.queryFriendList(params)
    }
    async getContact(params: Parameters<EyunContactService["getContact"]>[0]) {
        return this.contact.getContact(params)
    }
    async getContactPlus(params: Parameters<EyunContactService["getContactPlus"]>[0]) {
        return this.contact.getContactPlus(params)
    }
    async searchUser(params: Parameters<EyunContactService["searchUser"]>[0]) {
        return this.contact.searchUser(params)
    }
    async addUser(params: Parameters<EyunContactService["addUser"]>[0]) {
        return this.contact.addUser(params)
    }
    async acceptUser(params: Parameters<EyunContactService["acceptUser"]>[0]) {
        return this.contact.acceptUser(params)
    }
    async delContact(params: Parameters<EyunContactService["delContact"]>[0]) {
        return this.contact.delContact(params)
    }
    async modifyFriendRemark(params: Parameters<EyunContactService["modifyFriendRemark"]>[0]) {
        return this.contact.modifyFriendRemark(params)
    }
    async setFriendPermission(params: Parameters<EyunContactService["setFriendPermission"]>[0]) {
        return this.contact.setFriendPermission(params)
    }
    async setTop(params: Parameters<EyunContactService["setTop"]>[0]) {
        return this.contact.setTop(params)
    }
    async setDisturb(params: Parameters<EyunContactService["setDisturb"]>[0]) {
        return this.contact.setDisturb(params)
    }
    async sendHeadImage(params: Parameters<EyunContactService["sendHeadImage"]>[0]) {
        return this.contact.sendHeadImage(params)
    }
    async checkZombie(params: Parameters<EyunContactService["checkZombie"]>[0]) {
        return this.contact.checkZombie(params)
    }
    async getQrCode(params: Parameters<EyunContactService["getQrCode"]>[0]) {
        return this.contact.getQrCode(params)
    }
    async userPrivacySettings(params: Parameters<EyunContactService["userPrivacySettings"]>[0]) {
        return this.contact.userPrivacySettings(params)
    }

    async createChatroom(params: Parameters<EyunGroupService["createChatroom"]>[0]) {
        return this.group.createChatroom(params)
    }
    async addChatRoomMember(params: Parameters<EyunGroupService["addChatRoomMember"]>[0]) {
        return this.group.addChatRoomMember(params)
    }
    async inviteChatRoomMember(params: Parameters<EyunGroupService["inviteChatRoomMember"]>[0]) {
        return this.group.inviteChatRoomMember(params)
    }
    async deleteChatRoomMember(params: Parameters<EyunGroupService["deleteChatRoomMember"]>[0]) {
        return this.group.deleteChatRoomMember(params)
    }
    async modifyGroupName(params: Parameters<EyunGroupService["modifyGroupName"]>[0]) {
        return this.group.modifyGroupName(params)
    }
    async scanJoinRoom(params: Parameters<EyunGroupService["scanJoinRoom"]>[0]) {
        return this.group.scanJoinRoom(params)
    }
    async modifyGroupRemark(params: Parameters<EyunGroupService["modifyGroupRemark"]>[0]) {
        return this.group.modifyGroupRemark(params)
    }
    async queryGroupMemberDetail(params: Parameters<EyunGroupService["queryGroupMemberDetail"]>[0]) {
        return this.group.queryGroupMemberDetail(params)
    }
    async getChatRoomMember(params: Parameters<EyunGroupService["getChatRoomMember"]>[0]) {
        return this.group.getChatRoomMember(params)
    }
    async getChatRoomMemberInfo(params: Parameters<EyunGroupService["getChatRoomMemberInfo"]>[0]) {
        return this.group.getChatRoomMemberInfo(params)
    }
    async getChatRoomInfo(params: Parameters<EyunGroupService["getChatRoomInfo"]>[0]) {
        return this.group.getChatRoomInfo(params)
    }
    async getGroupQrCode(params: Parameters<EyunGroupService["getGroupQrCode"]>[0]) {
        return this.group.getGroupQrCode(params)
    }
    async setChatRoomAnnouncement(params: Parameters<EyunGroupService["setChatRoomAnnouncement"]>[0]) {
        return this.group.setChatRoomAnnouncement(params)
    }
    async roomTodo(params: Parameters<EyunGroupService["roomTodo"]>[0]) {
        return this.group.roomTodo(params)
    }
    async roomAppTodo(params: Parameters<EyunGroupService["roomAppTodo"]>[0]) {
        return this.group.roomAppTodo(params)
    }
    async operateChatRoom(params: Parameters<EyunGroupService["operateChatRoom"]>[0]) {
        return this.group.operateChatRoom(params)
    }
    async quitChatRoom(params: Parameters<EyunGroupService["quitChatRoom"]>[0]) {
        return this.group.quitChatRoom(params)
    }

    async setHttpCallbackUrl(params: Parameters<EyunWebhookService["setHttpCallbackUrl"]>[0]) {
        return this.webhook.setHttpCallbackUrl(params)
    }
    async cancelHttpCallbackUrl() {
        return this.webhook.cancelHttpCallbackUrl()
    }
}

let eyunServiceInstance: EyunService | null = null

export const initEyunService = (config: EyunConfig): EyunService => {
    eyunServiceInstance = new EyunService(config)
    return eyunServiceInstance
}

export const getEyunService = (): EyunService => {
    if (!eyunServiceInstance) {
        throw new Error("EyunService not initialized. Call initEyunService first.")
    }
    return eyunServiceInstance
}
