"use strict";
import User from "./user.model.js"; //Unico que puede ir en mayuscula
import { encrypt, checkPassword, checkUpdate } from "../utils/validator.js";
export const test = (req, res) => {
  return res.send("Hello word");
};

export const register = async (req, res) => {
  try {
    //Capturar la informacion del cliente (body)
    let data = req.body;
    console.log(data);
    //Encriptar la contrasenia
    data.password = await encrypt(data.password);
    //Asignar el rol por defecto
    data.role = "CLIENT"; //Si viene con otro valor o no viene, lo asigna a role Cliente
    //Crear una instancia del modelo (schema)
    let user = new User(data);
    //Guardar la informacion <-
    await user.save();
    //Responde al usuario
    return res.send({ message: "Registered Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error registering user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Capturar el id de usuario que se va a eliminar
    let { id } = req.params;
    //Eliminar (deleteOne/findOneAndDelete)
    let deleteUser = await User.findOneAndDelete({_id:id})
    //Verficar si el registro se elimino
    if(!deleteUser) return res.status(404).send({message: 'Account not found and not deleted'})
    //Responder
    return res.send({message: `Account with username ${deleteUser.username} deleted successfully`})
} catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error deleting user", error });
  }
};
export const updateUser = async (req, res) => {
  try {
    //Obtener el id del usuario a actualizar
    let { id } = req.params;
    //Obtener los datos que vamos a actualizar
    let data = req.body;
    //Validar si trae datos a actualizar
    let update = checkUpdate(data, id);
    if (!update)
      return res
        .status(400)
        .send({
          message:
            "Have submited some data that cannot be update or missing data",
        });
    //Actuazlicamos la db
    let updateUser = await User.findOneAndUpdate(
      { _id: id }, //ObjectId <- hexadecimal (Hora sys, version mongo, llave privada...)
      data, //Datos que va a actualizar
      { new: true }
    ); //Objeto de la DB ya actualizado
    if (!updateUser)
      return res.status(401).send({ message: "User not found and not update" });
    return res.send({ message: "Update user", updateUser });
  } catch (error) {
    console.log(error);
    if(error.keyValue.username) return res.status(400).send({message: `Username ${error.keyValue.username} is already taken`})
    return res.status(500).send({ message: "Error updating account", error });
  }
};

export const login = async (req, res) => {
  try {
    //Capturar la informacion (body)
    let { username, password } = req.body;
    //Validar que el usuario existe
    //findOne busca 1 registro
    let user = await User.findOne({ username });
    //Verifica que la contrasenia coincida
    if (user && (await checkPassword(password, user.password))) {
      let loggedUser = {
        username: user.username,
        name: user.name,
        role: user.role,
      };
      //Responder (dar acceso)
      return res.send({ message: `Welcome ${user.name}`, loggedUser });
    }
    return res.status(401).send({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to login" });
  }
};
