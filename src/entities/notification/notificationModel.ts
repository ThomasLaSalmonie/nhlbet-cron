import { db } from 'config/mysql';
import Citadelle from 'helpers/citadelle';

interface Notification {
	id?: number,
	user_id: number,
	is_viewed?: boolean,
	text: any,
	text_color: string,
	created_at?: string,
	updated_at?: string,
}

class Notification extends Citadelle {
	public static async insertNotification(notification: Notification): Promise<number> {
		const [result] = await db.query(`INSERT INTO notification SET ?`, [notification]);
		const insertId = 'insertId';
		return result[insertId];
	}
}

export default Notification;
