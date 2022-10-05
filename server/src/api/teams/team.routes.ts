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

// router.post(
//     '/',
//     validateRequest({
//         body: Team,
//     }),
//     TodoHandler.createOne
// );

// router.put(
//     '/:id',
//     validateRequest({
//         params: ParamsWithId,
//         body: Todo,
//     }),
//     TodoHandler.updateOne
// );
// router.delete(
//     '/:id',
//     validateRequest({
//         params: ParamsWithId,
//     }),
//     TodoHandler.deleteOne
// );

export default router;