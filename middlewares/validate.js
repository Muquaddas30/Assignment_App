const { validationResult } = require('express-validator');

//middleware func
//next next() → a function to pass control to the next middleware/controller

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};


module.exports = handleValidation;
