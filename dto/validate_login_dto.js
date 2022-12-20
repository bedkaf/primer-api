
const DTO_PROPERTY_NAME = ['email', 'password'];

const loignDTOSchema = {
  type: 'object',
  properties: {
    email:{
      type:'string',
      formnat: 'email'
    },
    password:{type:'string'},
    require:['email', 'password'],
    additionalProperties: false
  }
}

const validateLoginDTO = (req, res, next) => {
  // validación de objeto
  const loginDto =  req.body;

  if(typeof loginDto !== 'object') return res.status(400).send("El body no tiene formato correcto");

  const bodyPropertName = Object.keys(loginDto);
  const checkProperties = bodyPropertName.length === DTO_PROPERTY_NAME.length && 
    bodyPropertName.every((element) => DTO_PROPERTY_NAME.includes(element));

  if(!checkProperties) return res.status(400).send("el body debe contener solo email y password")
  //validacion de las propiedades del email y la contraseña
};

export default validateLoginDTO;