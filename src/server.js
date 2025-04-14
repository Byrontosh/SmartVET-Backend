// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import cloudinary from 'cloudinary'
import fileUpload from "express-fileupload"
import routerVeterinarios from './routers/veterinario_routes.js'
import routerPacientes from './routers/paciente_routes.js'
import routerTratamientos from './routers/tratamiento_routes.js'

// Inicializaciones
const app = express()
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))



// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
// Ruta principal
app.get('/',(req,res)=>{
    res.send("Server on")
})
// Rutas para veterinarios
app.use('/api',routerVeterinarios)
// Rutas para pacientes
app.use('/api',routerPacientes)
// Rutas para tratamientos
app.use('/api',routerTratamientos)
// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))



// Exportar la instancia de express por medio de app
export default  app