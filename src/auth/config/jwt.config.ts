import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: parseInt(process.env.JWT_TOKEN_TTL ?? '3600', 10),
    },
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
    googleAuthClientId: process.env.GOOGLE_CLIENT_ID,
    googleAuthClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
});
