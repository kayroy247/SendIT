import Joi from 'joi';

const validateInput = (input) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    description: Joi.string().alphanum().min(3).required(),
    weight: Joi.string().alphanum().required(),
    destination: Joi.string().alphanum().required()
  };
  return Joi.validate(input, schema);
};

export default validateInput;
