import validateInput from '../validators/inputValidator';

const validateUserInput = (req, res, next) => {
  const { error } = validateInput(req.body, 'user');
  console.log(validateInput(req.body, 'user'));
  if (error) {
    return res.status(400).json({
      status: 400,
      errormessage: error.details[0].message
    });
  }
  return next();
};

const validateLogin = (req, res, next) => {
  const { error } = validateInput(req.body, 'login');
  console.log(validateInput(req.body, 'login'));
  if (error) {
    return res.status(400).json({
      status: 400,
      errormessage: error.details[0].message
    });
  }
  return next();
};

export { validateUserInput, validateLogin };
