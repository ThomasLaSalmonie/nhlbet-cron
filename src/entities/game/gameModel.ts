
import { db } from 'config/mysql';
import Citadelle from 'helpers/citadelle';

interface Game {
	id?: number,
	gamepk_id: number,
	status: number,
	points_delivered?: number,
	season_id: number,
	game_date: Date,
	away_team_id: number,
	away_score: number,
	home_team_id: number,
	home_score: number,
	created_at?: string,
	updated_at?: string,
}

class Game extends Citadelle{
	/**
	 * Insert game
	 * @param {Game} game
	 * @return {Promise<number>}
	 */
	public static async insert(game: Game): Promise<number> {
		const [result] = await db.query(`INSERT INTO game SET ?`, [game]);
		const insertId = 'insertId';
		return result[insertId];
	}

	public static async getByPkId(gamepkId: number): Promise<Game> {
		const [result] = await db.query(`SELECT * FROM game WHERE gamepk_id = ?`, [gamepkId]);
		return result[0];
	}

	public static async update(id: number, values: object) {
		try {
			await db.query(`UPDATE game SET ? WHERE id = ?`, [values, id]);
		} catch (e) {
			throw(e);
		}
	}

	public static async getSeason(seasonCode: string): Promise<number> {
		const [result] = await db.query(`SELECT * FROM season WHERE code = ?`, [seasonCode]);
		if (result[0] === undefined) {
			const [season] = await db.query(`INSERT INTO season SET ?`, [{code: seasonCode}]);
			const insertId = 'insertId';
			return season[insertId];
		}
		return result[0].id;
	}
}

export default Game;