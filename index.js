console.clear("cls");
import express from "express";
import dotenv from "dotenv";
import {USER_BD} from "./bbdd.js";

dotenv.config();

const PORT = 2345;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

//Obtener los detalles de la cuenta
expressApp.get('/accoutn/:guid', (req,res) => {
  const {guid} = req.params;
  const user = USER_BD.find((element) => element.guid === guid);
  
  !user ? res.status(404).send() : res.send(user);
});

//Crear una cuenta a partir del guid y el name
expressApp.post('/accoutn', (req,res) => {
  const { guid, name } = req.body;
  
  if(!guid || !name) return res.state(400).send();
  
  const user = USER_BD.find((element) => element.guid === guid);
  if(user) return res.status(409).send();

  USER_BD.push({
    guid,
    name,
  });

  res.send("Cuenta creada");
});

//Actualizar una cuenta
expressApp.patch('/accoutn/:guid', (req,res) => {
  const {guid} = req.params;
  const {name} = req.body;

  if(!nome) return res.state(400).send();

  const user = USER_BD.find((element) => element.guid === guid);

  if(!name) res.status(404).send();
  
  res.send("Si se puede");
});

//Eliminar cuenta
expressApp.delete('/accoutn/:guid', (req,res) => {
  const {guid} = req.params;
  const userIndex = USER_BD.findIndex((element) => element.guid === guid);
  USER_BD.splice(userIndex,1);
  userIndex === -1 ? res.status(404).send() : res.send("Centa eliminada");
});

expressApp.listen(PORT, () => {
  console.log(`Algo esta pasando en el puerto ${PORT}`);
});