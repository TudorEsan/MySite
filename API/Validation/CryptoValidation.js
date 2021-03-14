const JoiExtension = require('@hapi/joi-date');
const Joi = require("@hapi/joi").extend(JoiExtension);;

const cryptoValidation = (date) => {
    const schema = Joi.object({
        type: Joi.string().valid('Ether', 'Bitcoin', 'Stellar'),
        bought: Joi.number().required(),
        cryptoBuyingPrice: Joi.number().required(),
        date: Joi.date().format('DD-MM-YYYY').raw()
    })
    return schema.validate(date);
}

const validateBallance = (obj) => {
    const schema = Joi.object({
        ballance: Joi.number().required(),
        user: Joi.string().required()
    })
    return schema.validate(obj)
}
module.exports = { cryptoValidation, validateBallance};