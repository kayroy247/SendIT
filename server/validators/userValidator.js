import Joi from 'joi';

const validateInput = (input) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    firstname: Joi.string().trim().min(3),
    lastname: Joi.string().trim().min(3),
    username: Joi.string().trim().min(3),
    password: Joi.string().trim().min(6).max(90)
      .required()
  };
  return Joi.validate(input, schema);
};

export default validateInput;
