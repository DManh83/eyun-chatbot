import { Request, Response } from "express"
import { getEyunService } from "../../services/eyunService"
import { User } from "../../models"

/**
 * Step 1: Login to platform - POST /iPadLogin
 * This initiates the login process and returns a QR code URL
 */
export const iPadLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { wcId, deviceType, proxy, proxyIp, proxyUser, proxyPassword, aid } = req.body
        const eyun = getEyunService()
        const result = await eyun.iPadLogin({
            wcId: wcId || "",
            deviceType: deviceType || "ipad",
            proxy,
            proxyIp,
            proxyUser,
            proxyPassword,
            aid,
        })

        // If login successful, save token to database
        if (result.code === "1000" && result.data) {
            await User.upsert({
                wId: result.data.wId,
                wcId: wcId || "",
                wAccount: "",
                nickName: null,
                headUrl: null,
                sex: null,
                mobilePhone: null,
                deviceType: deviceType || "ipad",
                uin: null,
            })
        }

        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

/**
 * Step 2: Get login result after scanning QR code - POST /getIPadLoginInfo
 * This confirms the login and retrieves the Authorization token
 */
export const getIPadLoginInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { wId, autoCheck, verifyCode } = req.body
        const user = await User.findOne({ where: { wId } })
        console.log("user", user)
        if (!user) {
            res.status(404).json({ code: "1001", message: "User not found", data: null })
            return
        }
        const eyun = getEyunService()
        const result = await eyun.getIPadLoginInfo({ wId, autoCheck, verifyCode })

        if (result.code === "1000" && result.data) {
            await user.update({
                wcId: result.data.wcId || "",
                wAccount: result.data.wAccount || "",
                nickName: result.data.nickName || null,
                headUrl: result.data.headUrl || null,
                sex: result.data.sex || null,
                mobilePhone: result.data.mobilePhone || null,
                uin: result.data.uin || null,
            })
        }

        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

/**
 * Get current callback URL - POST /getHttpCallbackUrl
 */
export const getHttpCallbackUrl = async (_req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService()
        const result = await eyun.getHttpCallbackUrl()
        res.json(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({ code: "1001", message, data: null })
    }
}

