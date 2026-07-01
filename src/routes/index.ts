import { Router } from "express"
import eyunRoutes from "./eyun"

const router = Router()

router.use("/eyun", eyunRoutes)

export default router

