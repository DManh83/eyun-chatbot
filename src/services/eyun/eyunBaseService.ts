import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { EyunConfig, EyunResponse } from "../../types/eyun"

export class EyunBaseService {
    protected client: AxiosInstance
    protected config: EyunConfig

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

    protected async request<T>(path: string, data?: unknown): Promise<EyunResponse<T>> {
        const response = await this.client.post<EyunResponse<T>>(path, data || {})
        return response.data
    }
}
