import { Router } from "express";
import { nanoid } from "nanoid";
import { USER_BD } from "../bbdd.js";
import auttByEmailPwd from "../helpers/auth-by-email-pwd.js";

const session = [];
const authSessionRouter = Router();

authSessionRouter.post("/login", (req, res) =>{

  const {email, password} = req.body;

  if(!email || !password) return res.sendStatus(400);

  try {
    const {guid} = auttByEmailPwd( email, password);

    const sessionId = nanoid();
    session.push({sessionId, guid});

    res.cookie('sessionId', sessionId, {
      httpOnly:true
    });
    
    return res.send();
  } catch (err) {
    return res.sendStatus(401);    
  }
});

authSessionRouter.get("/profile", (req, res) => {
  const {cookies} = req;

  if(!cookies.sessionId) return res.sendStatus(401);

  const userSession = session.find(element => element.sessionId === cookies.sessionId);

  if(!userSession) return res.sendStatus(401);

  const user = USER_BD.find(element => element.guid === userSession.guid);

  if(!user) return res.sendStatus(401);

  delete user.password;

  res.send(user);
})

export default authSessionRouter;