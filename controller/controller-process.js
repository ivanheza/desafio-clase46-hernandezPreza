import {cpus} from "os"
import config from "../config/config.js"
import logger from "../helpers/winston.js"
const numCPUs = cpus().length
let PUERTO = config.minimist_PORT || process.env.PORT || 8080

export const processInfo = (ctx) => {
   try {
      const {url, method} = ctx.req
      console.log()
      logger.info(`Metodo: ${method} - Ruta: ${url}`)

      let processInfo = {
         argumentos: process.argv,
         OS: process.platform,
         nodeVer: process.version,
         memoria: process.memoryUsage(),
         path: process.execPath,
         pID: process.pid,
         folder: process.cwd(),
         numCPUs: numCPUs,
         PORT: PUERTO,
      }

      ctx.body = {
         status: "success: Process Info",
         message: processInfo,
      }
   } catch (error) {
      console.log(error)
      logger.error(`${error} -  "Ocurrio un error para obtener la info."`)
   }
}
////-----

export const infoZip = (ctx) => {
   const {url, method} = ctx.req
   logger.info(`Metodo: ${method} - Ruta: ${url}`)

   let processInfo = {
      argumentos: process.argv,
      OS: process.platform,
      nodeVer: process.version,
      memoria: process.memoryUsage(),
      path: process.execPath,
      pID: process.pid,
      folder: process.cwd(),
      numCPUs: numCPUs,
      PORT: PUERTO,
   }

   ctx.body = {
      status: "success Process Info gZip",
      message: processInfo,
   }
}
