import {generarProductos} from "../mocks/mockP.js"
import logger from "../helpers/winston.js"
import {generarNumeros} from "../helpers/process-child.js"
import config from "../config/config.js"
import ProductosMongoDao from "../services/productosMongo.js"
import ProductosDAOFile from "../services/productosFileDao.js"
import productoDTO from "../DTO/productoDTO.js"

let persistencia

switch (config.persistencia) {
   case "MONGO":
      persistencia = new ProductosMongoDao()
      break
   case "FS":
      persistencia = new ProductosDAOFile()
      break
   default:
      break
}

//// Get Productos
export const getProductos = async (ctx) => {
   try {
      const {url, method} = ctx.req
      logger.info(`Metodo: ${method} - Ruta: ${url}`)
      const data = await persistencia.readData()
      // console.log("desde GetP")
      ctx.body = {
         status: "success",
         message: data,
      }
   } catch (error) {
      console.log(error)
      logger.error(`${error} -  "Ocurrio un error al insertar los Mocks"`)
   }
}

///Producto por ID
export const getProducto = async (ctx) => {
   try {
      const {url, method} = ctx.req
      logger.info(`Metodo: ${method} - Ruta: ${url}`)
      let id = ctx.params.id
      //console.log(id)
      const dataID = await persistencia.readID(id)
      // console.log("desde GetP")
      ctx.body = {
         status: "success",
         message: dataID,
      }
   } catch (error) {
      console.log(error)
      logger.error(`${error} -  "Ocurrio un error al insertar los Mocks"`)
   }
}
///Nuevo Producto
export const newProduct = async (ctx) => {
   try {
      const {url, method} = ctx.req
      logger.info(`Metodo: ${method} - Ruta: ${url}`)
      let newData = ctx.request.body
      //console.log(id)
      const data = await persistencia.guardarNuevo(newData)
      // console.log("desde GetP")
      ctx.body = {
         status: "success",
         message: data,
      }
   } catch (error) {
      console.log(error)
      logger.error(`${error} -  "Ocurrio un error al insertar los Mocks"`)
   }
}

export const borrarProducto = async (ctx) => {
   try {
      const {url, method} = ctx.req
      logger.info(`Metodo: ${method} - Ruta: ${url}`)
      console.log(req.params)
      let id = ctx.params.id
      await persistencia.borrar(id)
      ctx.body = {
         status: "TestProductos: success",
         message: `El dato con el id ${id} fue borrado.`,
      }
   } catch (err) {
      // 👇️ This runs
      console.log("Error: ", err)
   }
}

export const randomNumbers = async (ctx) => {
   //
   const {url, method} = ctx.req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)
   let cant = ctx.query.cant
   //const forked = fork("process-child.js")
   if (!cant) {
      const numeros = generarNumeros(1000000)
      const duplicated = numeros.reduce((acc, value) => {
         return {...acc, [value]: (acc[value] || 0) + 1}
      }, {})
      console.log("first")
      ctx.body = {
         status: "TestProductos: success",
         message: duplicated,
      }
   } else {
      console.log(cant, "cantidad")
      const numeros = generarNumeros(cant)
      const duplicated = numeros.reduce((acc, value) => {
         return {...acc, [value]: (acc[value] || 0) + 1}
      }, {})
      ctx.body = {
         status: "TestProductos: success",
         message: duplicated,
      }
   }
}

export const testProductos = async (ctx) => {
   try {
      const {url, method} = ctx.req
      logger.info(`Metodo: ${method} - Ruta: ${url}`)
      console.log("insertando productos aleatorios Mocks")
      ///---- se genera los Mocks
      const productosNuevos = generarProductos(5)
      const newdata = await persistencia.insertManyData(productosNuevos)

      ctx.body = {
         status: "TestProductos: success",
         message: newdata,
      }
   } catch (error) {
      console.log(error)
      logger.error(`${error} -  "Ocurrio un error al insertar los Mocks"`)
   }
}

////////////////////////////////WEB Sockets CONTROLLER////////////////////////////////

export const productosSockets = async (socket, sockets) => {
   try {
      ///Carga productos para cada socket
      const data = await persistencia.readData()

      socket.emit("loadProducts", data)
   } catch (error) {
      logger.error(`${error} -  "Ocurrio un error al cargar los productos"`)
   }
   //nuevo porducto
   socket.on("newProduct", async (product) => {
      //console.log(product)
      try {
         const newProd = await productoDTO(product)
         // console.log(newProd)
         await persistencia.guardarNuevo(newProd)

         sockets.emit("newProduct", newProd)
      } catch (error) {
         logger.error(`${error} -  "Ocurrio un error al cargar los productos"`)
      }
   })
   //Socket para borrar producto
   socket.on("deleteProduct", async (id) => {
      try {
         ///holas
         //console.log(id)
         await persistencia.borrar(id)
         /// se cargan los productos para los sockets
         sockets.emit("loadProducts", await persistencia.readData())
      } catch (error) {
         logger.error(error)
      }
   })
   //se define socket para escoger un solo producto, esto con la finalidad de poder hacer uso del boton borrar
   socket.on("getProduct", async (id) => {
      const listaProductos = await persistencia.readData()
      const product = listaProductos.find((p) => p.id == id)
      //console.log(product)
      socket.emit("selectedProduct", product)
   })
}
