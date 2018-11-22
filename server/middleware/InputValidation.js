import validateInput from '../validators/inputValidator';

const validateParcelInput = (req, res, next) => {
  const { error } = validateInput(req.body, 'parcel');
  if (error) {
    return res.status(400).json({
      message: 'Incomplete Input',
      errorMessage: error.details[0].message
    });
  }
  return next();
};

export default validateParcelInput;
