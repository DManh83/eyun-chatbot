import { EyunBaseService } from "./eyunBaseService"
import {
    EyunResponse,
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
    SendNameCardRequest,
} from "../../types/eyun"

/**
 * Message APIs
 * POST /sendText, /sendImage2, /sendFile, /sendFileBase64, /sendVoice, /sendVideo, /sendLink, /sendNameCard, /sendEmoji, /sendApplet, /revokeMsg
 */
export class EyunMessageService extends EyunBaseService {
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
}
