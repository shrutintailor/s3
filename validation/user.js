const Joi = require('joi')

exports.createrUser = Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required()
})

exports.getDp = Joi.object({
    user_id: Joi.number().integer().required()
})

exports.uploadDp = Joi.object({
    user_id: Joi.number().integer().required()
})