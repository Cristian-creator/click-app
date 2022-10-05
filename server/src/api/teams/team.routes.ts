import { Router } from 'express';
import * as TeamHandler from './teams.handlers';

const router = Router();

router.post('/leaderboard', TeamHandler.getLeaderBoard);

router.post(
    '/get-or-insert',
    // validateRequest({
    //     body: Team,
    // }), 
    TeamHandler.getOrInsertOne,
);

router.delete('/delete-all', TeamHandler.deleteAll);

export default router;