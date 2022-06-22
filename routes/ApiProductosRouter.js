import Router from "koa-router"
import {
   borrarProducto,
   getProducto,
   getProductos,
   randomNumbers,
   testProductos,
} from "../controller/controller-productos.js"

const router = new Router({
   prefix: "/api/productos",
})

router.get("/", getProductos)
router.get("/:id", getProducto)
router.delete("/productos/:id", borrarProducto)
////--------TEST MOCKS
router.get("/productos-test", testProductos)
router.get("/randoms", randomNumbers)

export default router
