import { Router } from "express";
import auttByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authRRouter = Router();

// Endpoint publico (no autorizado y no atenticado)
authRRouter.get("/publico", (req, res) => {
  res.send("Esta es la vista del publico");
})

// Endpoint autenticado
authRRouter.post("/autenticado", (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) return res.sendStatus(400);
  try{
    const user = auttByEmailPwd(email, password);
    return res.send(`Hola ${user.name} estas autentificado`);

  }catch(err){
    return res.sendStatus(401);
  }

})

// Endpoint autorizado
authRRouter.post("/autorizado", (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) return res.sendStatus(400);

  try{
    const user = auttByEmailPwd(email, password);
   
    if(user.role !== "admin") return res.send(403);

    return res.send(`Hola ${user.name} estas autentificado y autorizado`);

  }catch(err){
    return res.sendStatus(401);
  }

})

export default authRRouter;