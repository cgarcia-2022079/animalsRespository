'use strict'

import express from "express"
import {addAnimal, deleteAnimal, updateAnimal, dataAnimals, searchAnimal} from './animal.controller.js'

const api = express.Router()
api.post('/registerAnimal', addAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.get('/animals', dataAnimals)
api.get('/searchAnimal/:id', searchAnimal)
export default api