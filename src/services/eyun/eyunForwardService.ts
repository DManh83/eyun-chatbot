import { EyunBaseService } from "./eyunBaseService"
import { EyunResponse, ForwardFileRequest, ForwardImageRequest, ForwardVideoRequest, ForwardUrlRequest } from "../../types/eyun"

/**
 * Forward APIs
 * POST /sendRecvFile, /sendRecvImage, /sendRecvVideo, /forwardUrl
 */
export class EyunForwardService extends EyunBaseService {
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
}
