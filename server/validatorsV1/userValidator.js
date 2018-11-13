import Joi from 'joi';

const validateInput = (input) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    name: Joi.string().min(3).required(),
    address: Joi.string().required()
  };
  return Joi.validate(input, schema);
};

export default validateInput;
