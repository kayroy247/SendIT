import Joi from 'joi';

const validateInput = (input) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    description: Joi.string().trim().min(3).required(),
    weight: Joi.string().trim().required(),
    destination: Joi.string().trim().min(5).max(90)
      .required()
  };
  return Joi.validate(input, schema);
};

export default validateInput;
