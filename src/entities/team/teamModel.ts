
import { db } from 'config/mysql';
import Citadelle from 'helpers/citadelle';

interface Team {
	id: number,
	name: string,
	shortname: string,
	code: string,
	team: string,
	conference_id: number,
	division_id: number,
	franchise_id: number,
	location: string,
	link: string,
	active: boolean,
	created_at?: string,
	updated_at?: string,
}

class Team extends Citadelle{
	/**
	 * Insert team
	 * @param {Team} team
	 * @return {Promise<number>}
	 */
	public static async insert(team: Team): Promise<number> {
		const [result] = await db.query(`INSERT INTO team SET ?`, [team]);
		const insertId = 'insertId';
		return result[insertId];
	}

	public static async get(teamId: number): Promise<Team> {
		const [result] = await db.query(`SELECT * FROM team WHERE id = ?`, [teamId]);
		return result[0];
	}

	public static async update(id: number, values: object) {
		try {
			await db.query(`UPDATE team SET ? WHERE id = ?`, [values, id]);
		} catch (e) {
			throw(e);
		}
	}
}

export default Team;