import * as Router from 'koa-router';

import baseRouter from './base';
import teamRouter from './teamRouter';
import gameRouter from './gameRouter';

const router = new Router();

router.use(baseRouter);
router.use(gameRouter);
router.use(teamRouter);

export default router;