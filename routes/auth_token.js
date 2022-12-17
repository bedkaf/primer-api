import { Router } from "express";
import auttByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authTokenRouter = Router();

authTokenRouter.post("/login", (req, res) => {
  const {email, passord} = req.body;

  if(!email || !passord) return res.sendStatus(400);

  try{
    const user =  auttByEmailPwd(email, passord);
    return res.send(`Usuario ${user.name} autentificado`);
  }catch(err){
    return res.sendStatus(401);
  }
});

export default authTokenRouter;