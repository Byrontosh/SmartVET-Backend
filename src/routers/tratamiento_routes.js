import {Router} from 'express'
import { eliminarTratamiento, registrarTratamiento } from '../controllers/tratamiento_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
const router = Router()


router.post('/tratamiento/registro',verificarTokenJWT,registrarTratamiento)

router.delete('/tratamiento/:id',verificarTokenJWT,eliminarTratamiento)


export default router