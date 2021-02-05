import * as superagent from 'supertest'; // HTTP assertion
import app from 'server';

const request = superagent.agent(app.listen());

describe('GET / - a couple of simple api endpoints', () => {
	it('Hello API Request', async () => {
		await request.get('/').expect(200);
	});
	it('Health check API Request', async () => {
		await request.get('/health').expect(200);
	});
})
