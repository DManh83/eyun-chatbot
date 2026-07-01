import axios from "axios"

export const sendMessageToCoze = async (content: string, userId: string) => {
    try {
        const paramsData = {
            parameters: {
                BOT_USER_INPUT: content,
                idCindy: true,
                userId: "904288354",
            },
            workflow_id: "7506413211979579429",
        }
        // 发送消息到 AI 服务(coze)
        const aiResponse = await axios({
            method: "post",
            url: "https://api.coze.cn/v1/workflow/run",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer sat_YMd6hI4ZWYtni7MuBgbTSHr7LakAx7bjaj6M4U0jVvUbIosuyB0wWVzm84S7xT6s",
            },
            data: paramsData,
        })
        return aiResponse.data
    } catch (error) {
        console.error("Error sending message to Coze:", error)
        throw error
    }
}
