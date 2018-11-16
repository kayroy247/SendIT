import Joi from 'joi';

const validateInput = (input) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    name: Joi.string().trim().min(3).required(),
    address: Joi.string().trim().min(6).max(90)
      .required()
  };
  return Joi.validate(input, schema);
};

export default validateInput;
