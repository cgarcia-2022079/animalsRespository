//Encriptar - Validar 
//Diferentes DATOS
import {compare, hash} from 'bcrypt'
    //hash es un algoritmo que sirve para encriptar datos en forma de capas

export const encrypt = (password)=>{
    try {
        return hash(password, 10)        
    } catch (error) {
        console.log(error)
        return error
    }
}

export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const checkUpdate = (data, userId) =>{
    if (userId) {
        if (Object.entries(data).length === 0 || 
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == '') return false  
        return true
    } else{
        return false
    }
}