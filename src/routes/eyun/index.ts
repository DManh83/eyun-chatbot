import { Router } from "express"
import authRoutes from "./authRoutes"
import messageRoutes from "./messageRoutes"
import contactRoutes from "./contactRoutes"
import groupRoutes from "./groupRoutes"
import webhookRoutes from "./webhookRoutes"
import { requestLogger } from "../../middlewares/loggerMiddleware"

const router = Router()

router.use(requestLogger)
router.use("/auth", authRoutes)
router.use("/message", messageRoutes)
router.use("/contact", contactRoutes)
router.use("/group", groupRoutes)
router.use("/webhook", webhookRoutes)

export default router

