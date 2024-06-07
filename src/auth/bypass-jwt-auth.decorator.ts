import { SetMetadata } from '@nestjs/common';

const JWT_SECRET = process.env.JWT_SECRET;
() => {
  console.log(JWT_SECRET);
};
export const BYPASS_JWT_AUTH_KEY = JWT_SECRET;
export const BypassJwtAuth = () => SetMetadata(BYPASS_JWT_AUTH_KEY, true);
