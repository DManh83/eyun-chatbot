import axios from "axios"

// Coze API configuration
const COZE_API_URL = process.env.COZE_API_URL || "https://api.coze.cn"
const COZE_TOKEN = process.env.COZE_TOKEN
const COZE_WORKFLOW_ID = process.env.COZE_WORKFLOW_ID || "7506413211979579429"

export interface CozeWorkflowResponse {
    code: number
    msg: string
    data?: string // JSON string containing content_type, data (the actual response), etc.
    debug_url?: string
    usage?: {
        token_count: number
        output_count: number
        input_count: number
    }
    execute_id?: string
    detail?: {
        logid: string
    }
}

export interface CozeDataContent {
    content_type?: number
    data?: string // The actual shipping quote text
    original_result?: unknown
    type_for_model?: number
}

export const sendMessageToCoze = async (content: string, userId?: string): Promise<string> => {
    try {
        const paramsData = {
            parameters: {
                BOT_USER_INPUT: content,
                idCindy: true,
                userId: userId || "904288354",
            },
            workflow_id: COZE_WORKFLOW_ID,
        }

        const response = await axios({
            method: "post",
            url: `${COZE_API_URL}/v1/workflow/run`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${COZE_TOKEN}`,
            },
            data: paramsData,
            timeout: 12000, // 12s timeout as per docs
        })

        const data = response.data as CozeWorkflowResponse

        if (data.code !== 0) {
            throw new Error(`Coze API Error: ${data.msg}`)
        }

        // Parse the data field (it's a JSON string)
        if (data.data) {
            const parsed: CozeDataContent = JSON.parse(data.data)
            return parsed.data || ""
        }

        return ""
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Coze API error: ${error.response?.data?.msg || error.message}`)
        }
        throw error
    }
}

