import { Router } from "express";
import { USER_BD } from "../bbdd.js";
import { SignJWT, jwtVerify } from "jose";
import validateLoginDTO from "../dto/validate_login_dto.js";
import auttByEmailPwd from "../helpers/auth-by-email-pwd.js";

const authTokenRouter = Router();

//Login con Emay y Password
authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {

  const {email, password} = req.body;

  if(!email || !password) return res.sendStatus(400);

  try{
    const {guid} =  auttByEmailPwd(email, password);
    
    //Generar token y devolver token
    const encoder = new TextEncoder();
    const jwtConstructor = new SignJWT({guid});
    const jwt = await jwtConstructor
      .setProtectedHeader({alg:"HS256", typ:"JWT"})
      .setIssuedAt()
      .setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({jwt});
  }catch(err){
    return res.sendStatus(401);
  }
});

//Solicitud autentificada con el token, se obtiene el perfil del usuario
authTokenRouter.get("/profile", async (req, res) => {
  const { authorization } = req.headers;

  if(!authorization) return res.sendStatus(401);

  try {
    const encoder = new TextEncoder();

    const {payload} = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));

    const user = USER_BD.find((element) => element.guid === payload.guid);
    if (!user) return res.sendStatus(401);

    delete user.password;
    
    res.send(user);
    } catch (err) {
    return res.sendStatus(401);
  }

  //Obtener token de cabecera y comprobar su autenticidad

});

export default authTokenRouter;