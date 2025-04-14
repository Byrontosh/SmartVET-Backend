import Tratamiento from "../models/Tratamiento.js"
import mongoose from "mongoose"


const registrarTratamiento = async (req,res)=>{
    const {paciente} = req.body
    if( !mongoose.Types.ObjectId.isValid(paciente) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    await Tratamiento.create(req.body)
    res.status(200).json({msg:"Registro exitoso del tratamiento"})
}

const eliminarTratamiento = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe ese tratamiento`})
    await Tratamiento.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Tratamiento eliminado exitosamente"})
}



export{
    registrarTratamiento,
    eliminarTratamiento
}