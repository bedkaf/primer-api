import { Type } from "@sinclair/typebox";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import Ajv from "ajv";

const loignDTOSchema = Type.Object(
  {
    email: Type.String({
      format: 'email',
      errorMessage: {
        Type: 'el tipo debe ser sun String',
        format: 'debe contener un correo electronico valido',
      },
    }),
    password: Type.String({
      errorMessage: {
        Type: 'el tipo de contraseña debe ser un String',

      }
    })
  },{
    additionalProperties: false,
    errorMessage:{
      additionalProperties: "el fotmato del objeto no es valido",
    }
  }
);

const ajv = new Ajv({allErrors: true});
addFormats(ajv, ["email"]).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validate = ajv.compile(loignDTOSchema);

const validateLoginDTO = (req, res, next) => {
  // validación de objeto
  const isDTOValidate =  validate(req.body);
  
  if(!isDTOValidate) return res.status(400).send(ajv.errorsText(validate.errors, {separator: "\n"}));

  next();
};

export default validateLoginDTO;