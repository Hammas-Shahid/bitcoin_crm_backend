import { SetMetadata } from '@nestjs/common';

const JWT_SECRET = 'innovinci_btc_crm_secret';
export const BYPASS_JWT_AUTH_KEY = JWT_SECRET;
export const BypassJwtAuth = () => SetMetadata(BYPASS_JWT_AUTH_KEY, true);
