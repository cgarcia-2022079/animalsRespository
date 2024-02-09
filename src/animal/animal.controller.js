'use strict'
import Animal from "./animal.model.js"
import {checkUpdate} from '../utils/validator.js'
export const test = (req, res) =>{
    return res.send("Hello Word")
}

export const addAnimal = async (req, res) =>{
    try {
        let data = req.body
        console.log(data)
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: 'Registered Succesfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Error registering animal", error})       
    }
}

export const deleteAnimal = async (req, res) =>{
    try {
        let {id} = req.params
        let deleteAnimal = await Animal.findOneAndDelete({_id:id})
        if (!deleteAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
        return res.send({message: `Animal with name ${deleteAnimal.name} deleted successfuly`})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error deleting animal', error})
        
    }
}

export const updateAnimal = async(req, res)=>{
    try {
        let {id} = req.params       
        let data = req.body
        let updateAnimal = await Animal.findOneAndUpdate({_id:id}, data, {new:true})
        if (!updateAnimal) return res.status(401).send({message: 'Animal not found and not update'})
        return res.send({message: 'Update animal', updateAnimal})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error updating account', error})
    }
}

export const dataAnimals = async(req, res) => {
    try {
        let data = await Animal.find();
        console.log(data); // puede tener registros o un array vacío
        if(!data.length) {
            return res.send({message: 'No data in database'})
        }
        return res.status(200).send({data})
    }
    catch(error) {
        console.error(error);
        return res.status(500).send({message: 'Error when searching'})
    }
}

export const searchAnimal = async(req, res)=>{
    try {
        let {name} = req.params
        let data = await Animal.findOne({name})
        if (!data.length){
            return res.send({message: 'No data for this name'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Error when searching'})
    }
}