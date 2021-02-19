import axios from 'axios';
import * as moment from 'moment';
import MotherBase from 'core/motherBase';
import ApiResponse from 'helpers/apiResponse';
import GameService from './gameService';


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
		}
		for (const dateGame of dates) {
			const result = await GameService.handleGames(dateGame.games);
			results.created += result.created;
			results.updated += result.updated;
		}
		// tslint:disable-next-line:no-console
		console.log(results);
		return ApiResponse.createSuccess(results, 200).to(ctx);
	}
}

export default GameControllers;