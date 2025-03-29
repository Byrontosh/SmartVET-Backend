import jwt from "jsonwebtoken"
import Veterinario from "../models/Veterinario.js"

const crearTokenJWT = (id, rol) => {

    return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const verificarTokenJWT = async (req, res, next) => {

    if (!req.headers.authorization) return res.status(401).json({ msg: "Acceso denegado: token no proporcionado o inválido" })

    const { authorization } = req.headers

    try {
        const token = authorization.split(" ")[1];
        const { id, rol } = jwt.verify(token,process.env.JWT_SECRET)
        if (rol === "veterinario") {
            req.veterinarioBDD = await Veterinario.findById(id).lean().select("-password")
            next()
        }
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
}


export { 
    crearTokenJWT,
    verificarTokenJWT 
}

