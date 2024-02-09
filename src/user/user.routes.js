'use strict'

import express from 'express'
import {login, test, register, deleteUser, updateUser} from './user.controller.js'

const api = express.Router()
api.get('/test', test)
api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', updateUser)
api.delete('/delete/:id', deleteUser)
export default api
//export const api //<- tengo si o si el nombre que esta en este archivo
//export default api //<- importar con otro nombre