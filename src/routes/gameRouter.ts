import * as Router from 'koa-router';
import Game from 'entities/game/gameControllers';

const router = new Router();

router.get('/feed/game', Game.feedGame); // Feed some games
export default router.routes();
