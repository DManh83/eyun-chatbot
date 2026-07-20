import { EyunBaseService } from "./eyunBaseService"
import { EyunResponse, CreateChatroomRequest, AddChatRoomMemberRequest, InviteChatRoomMemberRequest, DeleteChatRoomMemberRequest, ModifyGroupNameRequest, ScanJoinRoomRequest, ModifyGroupRemarkRequest, QueryGroupMemberDetailRequest, GetChatRoomMemberRequest, GetChatRoomMemberInfoRequest, GetChatRoomInfoRequest, GetGroupQrCodeRequest, SetChatRoomAnnouncementRequest, RoomTodoRequest, RoomAppTodoRequest, OperateChatRoomRequest, QuitChatRoomRequest } from "../../types/eyun"

/**
 * Group APIs
 * POST /createChatroom, /addChatRoomMember, /inviteChatRoomMember, /deleteChatRoomMember, /modifyGroupName, /scanJoinRoom, /modifyGroupRemark, /queryGroupMemberDetail, /getChatRoomMember, /getChatRoomMemberInfo, /getChatRoomInfo, /getGroupQrCode, /setChatRoomAnnouncement, /roomTodo, /roomAppTodo, /operateChatRoom, /quitChatRoom
 */
export class EyunGroupService extends EyunBaseService {
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
}
