import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DB_PORT: Joi.number().required().default(5432),
  DB_HOST: Joi.string().required().default('localhost'),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.string().required(),
  PORT: Joi.number().required().default(3000),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_TTL: Joi.number().required().default(3600),
  JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),
  API_VERSION: Joi.string().default('1.0.0'),
  AWS_PUBLIC_S3_BUCKET_NAME: Joi.string().required(),
  AWS_S3_BUCKET_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_ACCESS_SECRET_KEY: Joi.string().required(),
  CLDFRONT_DOMAIN: Joi.string().required(),
});
