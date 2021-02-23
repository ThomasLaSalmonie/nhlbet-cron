import { db } from 'config/mysql';
import Citadelle from 'helpers/citadelle';

interface User {
	id?: number,
	token: string,
	nhlbetpoints: number,
	email: string,
	password: string,
	firstname: string,
	lastname: string,
	role_id?: number
	last_login_date: Date;
}

class User extends Citadelle {
	/**
	 * Get user by id
	 * @param {number} idUser
	 * @return {Promise<User>}
	 */
	public static async get(idUser: number): Promise<User> {
		const query = `SELECT *, CONCAT(user.firstname, ' ', user.lastname) AS name FROM user WHERE id = ?`;
		const [user] = await db.query(query, [idUser])
		return user[0];
	}

	public static async update(id: number, values: object) {
		try {
			await db.query(`UPDATE user SET ? WHERE id = ?`, [values, id]);
		} catch (e) {
			throw(e);
		}
	}
}

export default User;
