import { EyunBaseService } from "./eyunBaseService"
import { EyunResponse, InitFriendListRequest, GetAddressListRequest, GetContactRequest, GetContactPlusRequest, SearchUserRequest, AddUserRequest, AcceptUserRequest, DelContactRequest, ModifyRemarkRequest, SetFriendPermissionRequest, SetTopContactRequest, SetDisturbRequest, SendHeadImageRequest, CheckZombieRequest, GetQrCodeRequest, UserPrivacySettingsRequest } from "../../types/eyun"

/**
 * Contact APIs
 * POST /initAddressList, /getAddressList, /getContact, /getContactPlus, /searchUser, /addUser, /acceptUser, /delContact, /modifyRemark, /setFriendPemission, /setTop, /setDisturb, /sendHeadImage, /checkZombie, /getQrCode, /userPrivacySettings
 */
export class EyunContactService extends EyunBaseService {
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
}
