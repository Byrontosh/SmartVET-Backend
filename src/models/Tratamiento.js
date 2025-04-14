import mongoose, {Schema,model} from 'mongoose'

const tratamientoSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    prioridad:{
        type:String,
        require:true,
        enum:['Baja','Media','Alta']
    },
    paciente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Paciente'
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    estadoPago: {
        type: String,
        enum: ['Pendiente', 'Pagado'],
        default: 'Pendiente'
    }
},{
    timestamps:true
})

export default model('Tratamiento',tratamientoSchema)