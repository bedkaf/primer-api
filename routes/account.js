import { Router } from "express";
import userModel from "../schemas/user-schema.js";

const accoutnRoutes = Router();

//Midellware que loguea la IP
accoutnRoutes.use((req, res, next) => {
  next(console.log(req.ip));
});

//Obtener los detalles de la cuenta
accoutnRoutes.get('/:guid', async (req,res) => {
  const {guid} = req.params;
  console.log("se esta cargando los datos");

  const user = await userModel.findById(guid).exec();
  
  !user ? res.status(404).send() : res.send(user);
});

//Crear una cuenta a partir del guid y el name
accoutnRoutes.post('/', async (req,res) => {

  const { guid, name } = req.body;

  if(!guid || !name) return res.state(400).send(`El identificador de usuario ${guid} ya se encuentra activo`);
  
  const user = await userModel.findById(guid).exec();

  if(user) return res.status(400).send('Este usuario ya se encuentra registrado');

  const newUser = new userModel({ _id:guid, name});
  await newUser.save();

  res.send("Cuenta creada");
});

//Actualizar una cuenta
accoutnRoutes.patch('/:guid', async (req,res) => {
  const {guid} = req.params;
  const {name} = req.body;

  if(!name) return res.state(400).send();

  const user = await userModel.findById(guid).exec();

  if(!name) res.status(404).send();
  
  user.name = name;
  console.log(`Cambios echos recientemente: ${name}`);

  await user.save();

  return res.send();
});

//Eliminar cuenta
accoutnRoutes.delete('/:guid', async (req,res) => {
  const {guid} = req.params;
  const user = await userModel.findById(guid).exec();

  if(!user) return res.status(404).send("El usuario no existe");

  await user.remove();
  
  res.send();
});

export default accoutnRoutes;