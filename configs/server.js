//Toda la configuracion de express
//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {config} from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'

//Configuraciones
const server = express() //Crear servidor
config()
const port = process.env.PORT || 3200  //Si no hay un puerto predefinido se le asigna el 3200

//Configurar el servidor de express
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(cors()) //Aceptar o denegar solicitudes de diferentes origenes local/remoto
server.use(helmet())//Aplica capa de seguridad
server.use(morgan('dev'))//Crea logs de solicitudes del servidor HTTP


//Declaracion de rutas
server.use(userRoutes)
server.use(animalRoutes)

//Levantar el servidor
export const initServer = ()=>{
    server.listen(port)
    console.log(`Server HTTP runing in port ${port}`)
}