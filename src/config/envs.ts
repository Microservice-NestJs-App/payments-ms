import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  STRIP_SECRET: string;
  STRIPE_SUSSES_URL: string;
  STRIPE_CANCELED_UR: string;
  STRIP_ENDPOINT_SECRET: string;
}

const envsShema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    STRIP_SECRET: joi.string().required(),
    STRIPE_SUSSES_URL: joi.string().required(),
    STRIPE_CANCELED_UR: joi.string().required(),
    STRIP_ENDPOINT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsShema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  stripeSecret: envVars.STRIP_SECRET,
  stripeSussesUrl: envVars.STRIPE_SUSSES_URL,
  stripeCancelUrl: envVars.STRIPE_CANCELED_UR,
  stripeEndpointSecret: envVars.STRIP_ENDPOINT_SECRET,
};
