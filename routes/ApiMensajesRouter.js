import Router from "koa-router"
import {getMensajes, nuevoMensaje} from "../controller/controller-mensajes.js"

const router = new Router({
   prefix: "/api/mensajes",
})

router.get("/", getMensajes)
router.post("/", nuevoMensaje)

export default router
