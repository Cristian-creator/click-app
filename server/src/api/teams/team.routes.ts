import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { GetOrInsertTeam, MemberId } from './team.model';
import * as TeamHandler from './teams.handlers';

const router = Router();

router.post(
    '/leaderboard', 
    validateRequest({
        body: MemberId,
    }),
    TeamHandler.getLeaderboard);

router.post(
    '/get-or-insert',
    validateRequest({
        body: GetOrInsertTeam,
    }), 
    TeamHandler.getOrInsertOne,
);

router.delete('/delete-all', TeamHandler.deleteAll);

export default router;