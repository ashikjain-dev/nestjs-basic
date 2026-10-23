import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: parseInt(process.env.JWT_TOKEN_TTL ?? '3600', 10),
    },
  };
});
