import Joi from 'joi';

const validateInput = (input) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    description: Joi.string().min(3).required(),
    weight: Joi.string().required(),
    destination: Joi.string().required()
  };
  return Joi.validate(input, schema);
};

export default validateInput;
