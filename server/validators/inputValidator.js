import Joi from 'joi';

const validateInput = (input, entry) => {
  const parcelSchema = {
    userid: Joi.raw(),
    weight: Joi.required(),
    weightmetric: Joi.string().trim().min(2).max(20)
      .required(),
    destination: Joi.string().trim().min(5).max(90)
      .required(),
    token: Joi.raw(),
    status: Joi.raw(),
    senton: Joi.string().trim().min(5),
    pickuplocation: Joi.string().trim().min(5).required()
  };
  const userSchema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    firstname: Joi.string().trim().min(3),
    lastname: Joi.string().trim().min(3),
    username: Joi.string().trim().min(3),
    password: Joi.string().trim().min(6).max(90)
      .required()
  };

  const loginSchema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().trim().min(6).max(90)
      .required()
  };


  if (entry === 'user') {
    return Joi.validate(input, userSchema);
  }
  if (entry === 'parcel') {
    return Joi.validate(input, parcelSchema);
  }

  if (entry === 'login') {
    return Joi.validate(input, loginSchema);
  }
  return console.log('Wrong second argument in validateInput');
};

export default validateInput;
