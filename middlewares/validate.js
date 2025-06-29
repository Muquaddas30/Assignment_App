const {validateResult} = require('express-validator');

module.exports = function handleValidation(req,res,next) {
    const errors = validateResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();

};