import { USER_BD } from "../bbdd.js";

const auttByEmailPwd = (email, password) =>{

  const user = USER_BD.find(element => element.email === email);
  if(!user) throw new Error();

  if(user.password !== password) throw new Error();

  return user;
}

export default auttByEmailPwd;