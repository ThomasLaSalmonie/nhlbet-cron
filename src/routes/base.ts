import * as Router from 'koa-router';

import base from 'core/motherBase';

const router = new Router();

router.get('/', base.health); // base api code 200
router.get('/health', base.health); // test api health use by kubernetes

export default router.routes();
