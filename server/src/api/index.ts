import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import teams from './teams/team.routes';

const router = express.Router();

router.use('/teams', teams);

export default router;
