import * as Router from 'koa-router';
import Game from 'entities/game/gameControllers';

const router = new Router();

router.get('/feed/game', Game.feedGame); // Feed some games
router.get('/feed/game/today', Game.feedTodayGames); // Update today games
router.get('/feed/game/update', Game.updateGames); // Update current games
export default router.routes();
