import request from 'supertest';
import app from '../../app';
import { Teams } from './team.model';

beforeAll(async () => {
  try {
    await Teams.drop();
  } catch (error) {}
});

describe('POST /api/v1/teams/leaderboard', () => {
  it('responds with an array of teams', async () =>
    request(app)
      .post('/api/v1/teams/leaderboard')
      .set('Accept', 'application/json')
      .send({
        memberId: "778aabf7-824c-4b6a-b77f-e63e7b4a1e0c"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});
