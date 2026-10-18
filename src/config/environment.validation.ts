import * as Joi from 'joi'

export default Joi.object({
    NODE_ENV:Joi.string().valid('development','production','test').default('development'),
    DB_PORT:Joi.number().required().default(5432),
    DB_HOST:Joi.string().required().default('localhost'),
    DB_USERNAME:Joi.string().required(),
    DB_PASSWORD:Joi.string().required(),
    DB_NAME:Joi.string().required(),
    DB_SYNCHRONIZE:Joi.string().required(),
    PORT:Joi.number().required().default(3000)
})