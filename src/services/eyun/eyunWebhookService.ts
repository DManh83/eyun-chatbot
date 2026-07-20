import { EyunBaseService } from "./eyunBaseService"
import { EyunResponse } from "../../types/eyun"

/**
 * Webhook APIs
 * POST /setHttpCallbackUrl, /cancelHttpCallbackUrl
 */
export class EyunWebhookService extends EyunBaseService {
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
