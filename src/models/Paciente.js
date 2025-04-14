import mongoose, {Schema,model} from 'mongoose'
import bcrypt from "bcryptjs"

const pacienteSchema = new Schema({
    nombrePropietario:{
        type:String,
        require:true,
        trim:true
    },
    cedulaPropietario:{
        type:String,
        require:true,
        trim:true
    },
    emailPropietario:{
        type:String,
        require:true,
        trim:true
    },
    passwordPropietario:{
        type:String,
        require:true
    },
    celularPropietario:{
        type:String,
        require:true,
        trim:true
    },
    nombreMascota:{
        type:String,
        require:true,
        trim:true
    },
    avatarMascota:{
        type:String,
        trim:true
    },
    avatarMascotaID:{
        type:String,
        trim:true
    },
    avatarMascotaIA:{
        type:String,
        trim:true
    },
    tipoMascota:{
        type:String,
        require:true,
        trim:true
    },
    fechaNacimientoMascota:{
        type:Date,
        require:true,
        trim:true
    },
    sintomasMascota:{
        type:String,
        require:true,
        trim:true
    },
    fechaIngresoMascota:{
        type:Date,
        require:true,
        trim:true,
        default:Date.now()
    },
    salidaMascota:{
        type:Date,
        trim:true,
        default:null
    },
    estadoMascota:{
        type:Boolean,
        default:true
    },
    rol:{
        type:String,
        default:"paciente"
    },
    veterinario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Veterinario'
    },
    tratamientos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tratamiento'
        }
    ]
},{
    timestamps:true
})


// Método para cifrar el password del propietario
pacienteSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
pacienteSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.passwordPropietario)
    return response
}

export default model('Paciente',pacienteSchema)