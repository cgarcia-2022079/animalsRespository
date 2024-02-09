import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowerCase: true,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characteres'],
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        upperCase: true,
        enum: ['ADMIN', 'CLIENT'], //Solo los datos que esten en el arreglo son validos
        required: true
    }
})

//Pre mongoose

export default mongoose.model('user', userSchema)