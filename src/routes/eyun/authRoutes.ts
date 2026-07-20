import { Router } from "express"
import { iPadLogin, getIPadLoginInfo, secondLogin, logout, getHttpCallbackUrl } from "../../controllers/eyun/authController"

const router = Router()

// Platform login (Step 1: get QR code)
router.post("/iPadLogin", iPadLogin)

// Get login result after scanning QR (Step 2: confirm login)
router.post("/getIPadLoginInfo", getIPadLoginInfo)

// Secondary login with existing wcId
router.post("/secondLogin", secondLogin)

// Logout
router.post("/logout", logout)

// Get callback URL
router.post("/getHttpCallbackUrl", getHttpCallbackUrl)

export default router

