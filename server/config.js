// @ts-nocheck
import { assertNoUndefinedValues } from './helpers.js';

const config = {
	APP_FRIENDLY_NAME: 'fill-out--your-user-facing-app-name',
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
	PORT: process.env.PORT || 3001
};

assertNoUndefinedValues(config);

export default config;
