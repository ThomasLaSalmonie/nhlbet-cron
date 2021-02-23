import axios from 'axios';
import * as moment from 'moment';
import MotherBase from 'core/motherBase';
import ApiResponse from 'helpers/apiResponse';
import GameService from './gameService';
import Game from './gameModel';
import { userInfo } from 'os';
import User from 'entities/user/userModel';


class GameControllers extends MotherBase {

	public static async feedGame(ctx: any): Promise<any> {
		const { startDate, endDate, date } = ctx.request.query;
		const query = [];
		if (date !== undefined) {
			query.push(`date=${date}`);
		} else {
			if (startDate !== undefined) {
				query.push(`startDate=${startDate}`);
			} else {
				query.push(`startDate=${moment().subtract(7, 'd').format('YYYY-MM-DD')}`);
			}
			if (endDate !== undefined) {
				query.push(`endDate=${endDate}`);
			} else {
				query.push(`endDate=${moment().add(1, 'M').format('YYYY-MM-DD')}`);
			}
		}
		const response = await axios({
			method: 'GET',
			url: `https://statsapi.web.nhl.com/api/v1/schedule${query.length > 0 ? `?${query.join('&')}` : ''}`,
		});
		const dates = response.data.dates;
		const results = {
			created: 0,
			updated: 0,
		};
		for (const dateGame of dates) {
			const result = await GameService.handleGames(dateGame.games);
			results.created += result.created;
			results.updated += result.updated;
		}
		// tslint:disable-next-line:no-console
		console.log(results);
		return ApiResponse.createSuccess(results, 200).to(ctx);
	}

	public static async feedTodayGames(ctx: any): Promise<any> {
		const gamesToUpdate = await Game.getTodayGames();
		let gameUpdated = 0;
		for (const game of gamesToUpdate) {
			if (new Date(game.game_date) <= new Date() && game.status === 1) {
				await Game.update(game.id, { status: 3 });
				gameUpdated++;
			}
		}
		return ApiResponse.createSuccess({ gameUpdated }, 200).to(ctx);
	}

	public static async updateGames(ctx: any): Promise<any> {
		const gamesToUpdate = await Game.getGamesToUpdate();
		const results = {
			finished: 0,
			updated: 0,
		}
		const promises = [];
		for (const game of gamesToUpdate) {
			promises.push((async () => {
				const response = await axios({
					method: 'GET',
					url: `https://statsapi.web.nhl.com/api/v1/game/${game.gamepk_id}/feed/live`,
				});
				const data = response.data;
				const score = {
					away_score: data.liveData.linescore.teams.away.goals,
					home_score: data.liveData.linescore.teams.home.goals,
				};
				if (data.gameData.status.statusCode === '3') {
					const gameData: Game = {
						...game,
						...score,
					}
					await Game.update(game.id, gameData);
					results.updated ++;
					// Update game infos
				} else {
					// Get bets
					const bets = await Game.getBets(game.id);
					const totalHomeAmout = bets.map(bet => bet.home_amount).reduce((prev, next) => prev + next, 0);
					const totalAwayAmout = bets.map(bet => bet.away_amount).reduce((prev, next) => prev + next, 0);
					const totalAmount = totalAwayAmout + totalHomeAmout;
					for (const bet of bets) {
						const potentialWin = bet.home_amount > 0
							? bet.home_amount * (totalAmount / totalHomeAmout)
							: bet.away_amount * (totalAmount / totalAwayAmout);
						if ((score.home_score > score.away_score && bet.home_amount > bet.away_amount)
							|| (score.home_score < score.away_score && bet.home_amount < bet.away_amount)) {
							await Promise.all([
								User.update(bet.user_id, { nhlbetpoints: bet.user_points + potentialWin }),
								Game.updateBet(bet.id, { status: 1, amount_won: potentialWin })
							])
						} else {
							await Game.updateBet(bet.id, { status: 2 });
						}
					}
					results.finished ++;
					await Game.update(game.id, { status: data.gameData.status.statusCode, points_delivered: 1 });
				}
			})());
		}
		await Promise.all(promises);
		return ApiResponse.createSuccess({ results }, 200).to(ctx);
	}
}

export default GameControllers;