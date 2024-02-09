import mongoose from 'mongoose'

const animalSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    race:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    character:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    keeper:{
        type: String,
        required: true
    }
})

export default mongoose.model('animal', animalSchema)