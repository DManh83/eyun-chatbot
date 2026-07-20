import { EyunBaseService } from "./eyunBaseService"
import { EyunResponse, LoginResponse } from "../../types/eyun"

/**
 * Auth APIs
 * POST /iPadLogin, /getIPadLoginInfo, /secondLogin, /getHttpCallbackUrl, /logout
 */
export class EyunAuthService extends EyunBaseService {
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
        console.log("iPadLogin", params)
        console.log("iPadLogin", this.client.defaults.headers)
        return this.request("/iPadLogin", params)
    }

    /**
     * Step 2: After scanning QR code, get login result
     * POST /getIPadLoginInfo
     */
    async getIPadLoginInfo(params: { wId: string; autoCheck: boolean; verifyCode?: string | null }): Promise<EyunResponse<LoginResponse>> {
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
}
