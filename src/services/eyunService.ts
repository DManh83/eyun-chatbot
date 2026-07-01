import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import {
    EyunConfig,
    EyunResponse,
    LoginResponse,
    SendTextRequest,
    SendImageRequest,
    SendFileRequest,
    SendFileBase64Request,
    SendVoiceRequest,
    SendVideoRequest,
    SendLinkRequest,
    SendEmojiRequest,
    SendAppletRequest,
    RevokeMsgRequest,
    ForwardFileRequest,
    ForwardImageRequest,
    ForwardVideoRequest,
    ForwardUrlRequest,
    GetMsgFileRequest,
    GetMsgImgRequest,
    GetMsgVoiceRequest,
    GetMsgEmojiRequest,
    AsyncVideoDownloadRequest,
    AsyncVideoDownloadResponse,
    InitFriendListRequest,
    GetAddressListRequest,
    GetContactRequest,
    GetContactPlusRequest,
    SearchUserRequest,
    AddUserRequest,
    AcceptUserRequest,
    DelContactRequest,
    ModifyRemarkRequest,
    SetFriendPermissionRequest,
    SetTopContactRequest,
    SetDisturbRequest,
    SendHeadImageRequest,
    CheckZombieRequest,
    GetQrCodeRequest,
    UserPrivacySettingsRequest,
    AddChatRoomMemberRequest,
    InviteChatRoomMemberRequest,
    DeleteChatRoomMemberRequest,
    ModifyGroupNameRequest,
    ScanJoinRoomRequest,
    ModifyGroupRemarkRequest,
    QueryGroupMemberDetailRequest,
    GetChatRoomMemberRequest,
    GetChatRoomMemberInfoRequest,
    GetChatRoomInfoRequest,
    SetChatRoomAnnouncementRequest,
    RoomTodoRequest,
    RoomAppTodoRequest,
    OperateChatRoomRequest,
    QuitChatRoomRequest,
    SendNameCardRequest,
    CreateChatroomRequest,
    GetGroupQrCodeRequest,
} from "../types/eyun"

export class EyunService {
    private client: AxiosInstance
    private config: EyunConfig

    constructor(config: EyunConfig) {
        this.config = config
        this.client = axios.create({
            baseURL: config.baseUrl || process.env.EYUN_BASE_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: config.token || process.env.EYUN_TOKEN,
            },
        } as AxiosRequestConfig)
    }

    updateToken(token: string): void {
        this.config.token = token
        this.client.defaults.headers["Authorization"] = token
    }

    private async request<T>(path: string, data?: unknown): Promise<EyunResponse<T>> {
        const response = await this.client.post<EyunResponse<T>>(path, data || {})
        return response.data
    }

    // ===== Auth APIs =====
    /**
     * Step 1: Login to platform to get Authorization token
     * POST /iPadLogin
     */
    async iPadLogin(params: {
        wcId?: string
        deviceType?: string
        proxy?: number
        proxyIp?: string
        proxyUser?: string
        proxyPassword?: string
        aid?: string
    }): Promise<EyunResponse<{ wId: string; qrCodeUrl: string }>> {
        return this.request("/iPadLogin", params)
    }

    /**
     * Step 2: After scanning QR code, get login result
     * POST /getIPadLoginInfo
     */
    async getIPadLoginInfo(params: { wId: string; autoCheck: boolean; verifyCode?: string }): Promise<EyunResponse<LoginResponse>> {
        return this.request("/getIPadLoginInfo", params)
    }

    /**
     * Secondary login - re-login with existing wcId
     * POST /secondLogin
     */
    async secondLogin(params: { wcId: string; aid?: string }): Promise<EyunResponse> {
        return this.request("/secondLogin", params)
    }

    /**
     * Get callback URL
     * POST /getHttpCallbackUrl
     */
    async getHttpCallbackUrl(): Promise<EyunResponse<{ url: string }>> {
        return this.request("/getHttpCallbackUrl", {})
    }

    /**
     * Logout
     * POST /logout
     */
    async logout(wId: string): Promise<EyunResponse> {
        return this.request("/logout", { wId })
    }

    // ===== Message APIs =====
    async sendText(params: SendTextRequest): Promise<EyunResponse> {
        return this.request("/sendText", params)
    }

    async sendImage(params: SendImageRequest): Promise<EyunResponse> {
        return this.request("/sendImage2", params)
    }

    async sendFile(params: SendFileRequest): Promise<EyunResponse> {
        return this.request("/sendFile", params)
    }

    async sendFileBase64(params: SendFileBase64Request): Promise<EyunResponse> {
        return this.request("/sendFileBase64", params)
    }

    async sendVoice(params: SendVoiceRequest): Promise<EyunResponse> {
        return this.request("/sendVoice", params)
    }

    async sendVideo(params: SendVideoRequest): Promise<EyunResponse> {
        return this.request("/sendVideo", params)
    }

    async sendLink(params: SendLinkRequest): Promise<EyunResponse> {
        return this.request("/sendLink", params)
    }

    async sendNameCard(params: SendNameCardRequest): Promise<EyunResponse> {
        return this.request("/sendNameCard", params)
    }

    async sendEmoji(params: SendEmojiRequest): Promise<EyunResponse> {
        return this.request("/sendEmoji", params)
    }

    async sendApplet(params: SendAppletRequest): Promise<EyunResponse> {
        return this.request("/sendApplet", params)
    }

    async sendGroupAt(params: SendTextRequest): Promise<EyunResponse> {
        return this.request("/sendText", params)
    }

    async revokeMsg(params: RevokeMsgRequest): Promise<EyunResponse> {
        return this.request("/revokeMsg", params)
    }

    // ===== Forward APIs =====
    async sendRecvFile(params: ForwardFileRequest): Promise<EyunResponse> {
        return this.request("/sendRecvFile", params)
    }

    async sendRecvImage(params: ForwardImageRequest): Promise<EyunResponse> {
        return this.request("/sendRecvImage", params)
    }

    async sendRecvVideo(params: ForwardVideoRequest): Promise<EyunResponse> {
        return this.request("/sendRecvVideo", params)
    }

    async forwardUrl(params: ForwardUrlRequest): Promise<EyunResponse> {
        return this.request("/forwardUrl", params)
    }

    // ===== Download APIs =====
    async getMsgFile(params: GetMsgFileRequest): Promise<EyunResponse<{ content: string }>> {
        return this.request("/getMsgFile", params)
    }

    async getMsgImg(params: GetMsgImgRequest): Promise<EyunResponse<{ content: string }>> {
        return this.request("/getMsgImg", params)
    }

    async getMsgVoice(params: GetMsgVoiceRequest): Promise<EyunResponse<{ content: string }>> {
        return this.request("/getMsgVoice", params)
    }

    async getMsgEmoji(params: GetMsgEmojiRequest): Promise<EyunResponse<{ content: string }>> {
        return this.request("/getMsgEmoji", params)
    }

    async asynGetMsgVideo(params: AsyncVideoDownloadRequest): Promise<EyunResponse<AsyncVideoDownloadResponse>> {
        return this.request("/asynGetMsgVideo", params)
    }

    async getMsgVideoRes(id: string): Promise<EyunResponse<{ content: string }>> {
        return this.request("/getMsgVideoRes", { id })
    }

    // ===== Contact APIs =====
    async initAddressList(params: InitFriendListRequest): Promise<EyunResponse> {
        return this.request("/initAddressList", params)
    }

    async queryFriendList(params: GetAddressListRequest): Promise<EyunResponse> {
        return this.request("/getAddressList", params)
    }

    async getContact(params: GetContactRequest): Promise<EyunResponse> {
        return this.request("/getContact", params)
    }

    async getContactPlus(params: GetContactPlusRequest): Promise<EyunResponse> {
        return this.request("/getContactPlus", params)
    }

    async searchUser(params: SearchUserRequest): Promise<EyunResponse> {
        return this.request("/searchUser", params)
    }

    async addUser(params: AddUserRequest): Promise<EyunResponse> {
        return this.request("/addUser", params)
    }

    async acceptUser(params: AcceptUserRequest): Promise<EyunResponse> {
        return this.request("/acceptUser", params)
    }

    async delContact(params: DelContactRequest): Promise<EyunResponse> {
        return this.request("/delContact", params)
    }

    async modifyFriendRemark(params: ModifyRemarkRequest): Promise<EyunResponse> {
        return this.request("/modifyRemark", params)
    }

    async setFriendPermission(params: SetFriendPermissionRequest): Promise<EyunResponse> {
        return this.request("/setFriendPemission", params)
    }

    async setTop(params: SetTopContactRequest): Promise<EyunResponse> {
        return this.request("/setTop", params)
    }

    async setDisturb(params: SetDisturbRequest): Promise<EyunResponse> {
        return this.request("/setDisturb", params)
    }

    async sendHeadImage(params: SendHeadImageRequest): Promise<EyunResponse> {
        return this.request("/sendHeadImage", params)
    }

    async checkZombie(params: CheckZombieRequest): Promise<EyunResponse> {
        return this.request("/checkZombie", params)
    }

    async getQrCode(params: GetQrCodeRequest): Promise<EyunResponse> {
        return this.request("/getQrCode", params)
    }

    async userPrivacySettings(params: UserPrivacySettingsRequest): Promise<EyunResponse> {
        return this.request("/userPrivacySettings", params)
    }

    // ===== Group APIs =====
    async createChatroom(params: CreateChatroomRequest): Promise<EyunResponse> {
        return this.request("/createChatroom", params)
    }

    async addChatRoomMember(params: AddChatRoomMemberRequest): Promise<EyunResponse> {
        return this.request("/addChatRoomMember", params)
    }

    async inviteChatRoomMember(params: InviteChatRoomMemberRequest): Promise<EyunResponse> {
        return this.request("/inviteChatRoomMember", params)
    }

    async deleteChatRoomMember(params: DeleteChatRoomMemberRequest): Promise<EyunResponse> {
        return this.request("/deleteChatRoomMember", params)
    }

    async modifyGroupName(params: ModifyGroupNameRequest): Promise<EyunResponse> {
        return this.request("/modifyGroupName", params)
    }

    async scanJoinRoom(params: ScanJoinRoomRequest): Promise<EyunResponse> {
        return this.request("/scanJoinRoom", params)
    }

    async modifyGroupRemark(params: ModifyGroupRemarkRequest): Promise<EyunResponse> {
        return this.request("/modifyGroupRemark", params)
    }

    async queryGroupMemberDetail(params: QueryGroupMemberDetailRequest): Promise<EyunResponse> {
        return this.request("/queryGroupMemberDetail", params)
    }

    async getChatRoomMember(params: GetChatRoomMemberRequest): Promise<EyunResponse> {
        return this.request("/getChatRoomMember", params)
    }

    async getChatRoomMemberInfo(params: GetChatRoomMemberInfoRequest): Promise<EyunResponse> {
        return this.request("/getChatRoomMemberInfo", params)
    }

    async getChatRoomInfo(params: GetChatRoomInfoRequest): Promise<EyunResponse> {
        return this.request("/getChatRoomInfo", params)
    }

    async getGroupQrCode(params: GetGroupQrCodeRequest): Promise<EyunResponse<{ qrCode: string }>> {
        return this.request("/getGroupQrCode", params)
    }

    async setChatRoomAnnouncement(params: SetChatRoomAnnouncementRequest): Promise<EyunResponse> {
        return this.request("/setChatRoomAnnouncement", params)
    }

    async roomTodo(params: RoomTodoRequest): Promise<EyunResponse> {
        return this.request("/roomTodo", params)
    }

    async roomAppTodo(params: RoomAppTodoRequest): Promise<EyunResponse> {
        return this.request("/roomAppTodo", params)
    }

    async operateChatRoom(params: OperateChatRoomRequest): Promise<EyunResponse> {
        return this.request("/operateChatRoom", params)
    }

    async quitChatRoom(params: QuitChatRoomRequest): Promise<EyunResponse> {
        return this.request("/quitChatRoom", params)
    }

    // ===== Webhook APIs =====
    /**
     * Set HTTP callback URL for receiving messages
     * POST /setHttpCallbackUrl
     */
    async setHttpCallbackUrl(params: { httpUrl: string; type: number }): Promise<EyunResponse> {
        return this.request("/setHttpCallbackUrl", params)
    }

    /**
     * Cancel HTTP callback URL
     * POST /cancelHttpCallbackUrl
     */
    async cancelHttpCallbackUrl(): Promise<EyunResponse> {
        return this.request("/cancelHttpCallbackUrl", {})
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

