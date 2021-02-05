import * as Sentry from '@sentry/node';
import * as dotenv from 'dotenv';

dotenv.config();

// Config client Sentry.io
if (process.env.SENTRY) {
	Sentry.init({
		dsn: process.env.SENTRY,
		environment: process.env.NODE_ENV,
	});
}

export default Sentry;
