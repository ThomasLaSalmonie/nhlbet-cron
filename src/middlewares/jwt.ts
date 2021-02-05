import * as koaJwt from 'koa-jwt';

class JwtMiddleware {
	public static construct() {
		const enableJwt = process.env.ENABLE_JWT === '1' || false;
		// passthrough option to always yield next, even if no valid Authorization header was found
		return koaJwt({
			secret: process.env.JWT_SECRET, passthrough: !enableJwt,
		});
	}
}

module.exports = JwtMiddleware.construct();