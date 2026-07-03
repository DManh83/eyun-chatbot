import axios, { AxiosInstance } from "axios"

// OpenClaw HTTP API configuration
// Use local gateway: http://127.0.0.1:18789 or remote: https://openclaw.dadaex.cn
const OPENCLAW_HTTP_URL = process.env.OPENCLAW_HTTP_URL || "https://openclaw.dadaex.cn"
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN

export interface OpenClawMessage {
    role: "user" | "assistant" | "system"
    content: string
}

export interface OpenClawContentBlock {
    type: string
    text?: string
}

export interface OpenClawOutputMessage {
    type: string
    id?: string
    role?: string
    content?: OpenClawContentBlock[]
    phase?: string
    status?: string
}

export interface OpenClawResponse {
    id?: string
    object?: string
    created_at?: number
    status?: string
    model?: string
    output?: OpenClawOutputMessage[]
    usage?: {
        input_tokens: number
        output_tokens: number
        total_tokens: number
    }
    error?: string
}

class OpenClawService {
    private client: AxiosInstance

    constructor() {
        this.client = axios.create({
            baseURL: OPENCLAW_HTTP_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENCLAW_TOKEN}`,
            },
            timeout: 60000, // 60s timeout for AI responses
        })
    }

    /**
     * Send chat message to OpenClaw HTTP API and get AI response
     * Uses /v1/responses endpoint
     */
    async chatCompletion(messages: OpenClawMessage[]): Promise<string> {
        try {
            // Convert messages to single input string
            const input = messages.map((m) => `${m.role === "system" ? "" : m.role + ": "}${m.content}`).join("\n")

            const response = await this.client.post<OpenClawResponse>("/v1/responses", {
                model: "openclaw/default",
                input,
                stream: false,
            })

            if (response.status !== 200) {
                throw new Error(`OpenClaw API Error: HTTP ${response.status}`)
            }

            // Extract content from response
            // Response format: output[0].content[0].type === "output_text" && output[0].content[0].text
            let content: string | null = null

            const output = response.data.output
            if (output && output.length > 0) {
                const message = output[0]
                if (message.content && message.content.length > 0) {
                    const textBlock = message.content.find((block) => block.type === "output_text")
                    if (textBlock?.text) {
                        content = textBlock.text
                    }
                }
            }

            if (!content) {
                throw new Error("No content in OpenClaw response")
            }

            return content
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status
                const data = error.response?.data
                if (status === 401) {
                    throw new Error("OpenClaw authentication failed. Check your token.")
                }
                if (status === 404) {
                    throw new Error("OpenClaw API not found. Check your OPENCLAW_HTTP_URL.")
                }
                throw new Error(`OpenClaw API error: ${data?.error || error.message}`)
            }
            throw error
        }
    }

    /**
     * Send a simple chat message and get response
     */
    async chat(content: string): Promise<string> {
        return this.chatCompletion([{ role: "user", content }])
    }
}

let openclawServiceInstance: OpenClawService | null = null

export const getOpenClawService = (): OpenClawService => {
    if (!openclawServiceInstance) {
        openclawServiceInstance = new OpenClawService()
    }
    return openclawServiceInstance
}

export default OpenClawService

