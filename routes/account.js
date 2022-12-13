import { Router } from "express";
import {USER_BD} from "../bbdd.js";

const accoutnRoutes = Router();

//Midellware que loguea la IP
accoutnRoutes.use((req, res, next) => {
  console.log(req.ip);
  next();
});

//Obtener los detalles de la cuenta
accoutnRoutes.get('/:guid', (req,res) => {
  const {guid} = req.params;
  const user = USER_BD.find((element) => element.guid === guid);
  
  !user ? res.status(404).send() : res.send(user);
});

//Crear una cuenta a partir del guid y el name
accoutnRoutes.post('', (req,res) => {
  const { guid, name } = req.body;
  
  if(!guid || !name) return res.state(400).send(`El identificador de usuario ${guid} ya se encuentra activo`);

  const user = USER_BD.find((element) => element.guid === guid);
  if(user) return res.status(409).send();

  USER_BD.push({
    guid,
    name,
  });

  res.send("Cuenta creada");
});

//Actualizar una cuenta
accoutnRoutes.patch('/:guid', (req,res) => {
  const {guid} = req.params;
  const {name} = req.body;

  if(!name) return res.state(400).send();

  const user = USER_BD.find((element) => element.guid === guid);

  if(!name) res.status(404).send();
  
  user.name = name;
  console.log(`Cambios echos recientemente: ${name}`);
  return res.send();
});

//Eliminar cuenta
accoutnRoutes.delete('/:guid', (req,res) => {
  const {guid} = req.params;
  const userIndex = USER_BD.findIndex((element) => element.guid === guid);
  USER_BD.splice(userIndex,1);
  userIndex === -1 ? res.status(404).send() : res.send("Centa eliminada");
});

export default accoutnRoutes;