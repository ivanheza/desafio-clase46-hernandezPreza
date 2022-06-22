import Router from "koa-router"

import {infoZip, processInfo} from "../controller/controller-process.js"
import compression from "compression"

const router = new Router({
   prefix: "/process/info",
})
router.get("/", processInfo)
////---- Ruta con el middleware Compression()

//router.get("/zip", compression(), infoZip)

export default router
