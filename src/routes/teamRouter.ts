import * as Router from 'koa-router';
import Team from 'entities/team/teamControllers';

const router = new Router();

router.get('/feed/team', Team.feedTeam); // Feed all nhl teams
export default router.routes();
