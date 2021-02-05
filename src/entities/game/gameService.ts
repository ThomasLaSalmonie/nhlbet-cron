import Game from './gameModel';

class GameService {
	public static async handleGames(games: any[]): Promise<any>{
		const result = {
			created: 0,
			updated: 0,
		};
		for (const game of games) {
			const existingGame = await Game.getByPkId(game.gamePk);
			const seasonId = await Game.getSeason(game.season);
			const data = {
				gamepk_id: game.gamePk,
				status: game.status.statusCode,
				season_id: seasonId,
				game_date: new Date(game.gameDate),
				away_team_id: game.teams.away.team.id,
				away_score: game.teams.away.score,
				home_team_id: game.teams.home.team.id,
				home_score: game.teams.home.score,
			};
			if (existingGame === undefined) {
				await Game.insert(data);
				result.created++;
			} else {
				await Game.update(existingGame.id, data);
				result.updated++;
			}
		}
		return result;
	}
}

export default GameService;