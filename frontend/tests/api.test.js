import request from 'supertest';
import app from '../api/index.js';
import { initDb, closeDb, resetVotes } from '../api/database.js';

beforeAll(async () => {
    // initDb will use :memory: if process.env.NODE_ENV === 'test'
    process.env.NODE_ENV = 'test';
    await initDb();
});

beforeEach(async () => {
    // Clear votes before each test to guarantee isolation
    await resetVotes();
});

afterAll(async () => {
    await closeDb();
});

describe('Voting API Endpoints (Unified)', () => {

    it('should return health status', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('ok');
        expect(res.body.timestamp).toBeDefined();
    });

    it('should return initial results', async () => {
        const res = await request(app).get('/api/results');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('options');
        expect(res.body.options.length).toBe(3);
        expect(res.body.options[0].votes).toBe(0);
    });

    it('should allow voting for a valid option', async () => {
        const res = await request(app)
            .post('/api/vote')
            .send({ optionId: 'a' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.options).toBeDefined();

        const optA = res.body.options.find(o => o.id === 'a');
        expect(optA.votes).toBe(1);
    });

    it('should prevent double voting', async () => {
        const agent = request.agent(app);

        const firstVote = await agent
            .post('/api/vote')
            .send({ optionId: 'b' });
        expect(firstVote.statusCode).toEqual(200);

        const secondVote = await agent
            .post('/api/vote')
            .send({ optionId: 'b' });

        expect(secondVote.statusCode).toEqual(403);
        expect(secondVote.body.message).toBe('You have already voted');
    });

    it('should reject invalid voting options', async () => {
        const agent = request.agent(app);
        const res = await agent
            .post('/api/vote')
            .send({ optionId: 'z' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Invalid option');
    });

    it('should reject reset without correct token', async () => {
        const res = await request(app)
            .post('/api/reset')
            .send({ token: 'wrong_token' });

        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toBe('Invalid token');
    });

    it('should reset votes with correct token', async () => {
        process.env.ADMIN_RESET_TOKEN = 'test_admin_token';

        const res = await request(app)
            .post('/api/reset')
            .send({ token: 'test_admin_token' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);

        const results = await request(app).get('/api/results');
        for (const opt of results.body.options) {
            expect(opt.votes).toBe(0);
        }
    });
});
