import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as bodyparser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as dotenv from 'dotenv';

import Sentry from 'helpers/sentryClient';
import routes from 'routes/index';

dotenv.config();

const app = new Koa();

// Custom uncatched error handling
app.use(async (ctx, next) => next().catch((err) => {
	if (['prod', 'dev'].includes(process.env.NODE_ENV)) {
		Sentry.withScope((scope) => {
			scope.addEventProcessor(async event => Sentry.Handlers.parseRequest(event, ctx.request));
			Sentry.captureException(err);
		});
	}
	console.error(err);
}));

app
	.use(cors())
	.use(bodyparser())
	.use(logger())
	.use(routes.routes())
	.use(routes.allowedMethods())
	.listen(process.env.APP_PORT);

// tslint:disable-next-line:no-console
console.log(`App start on port: ${process.env.APP_PORT}`);
export default app;
