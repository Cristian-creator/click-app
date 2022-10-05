import * as z from 'zod';
import { WithId } from 'mongodb';
import { db } from '../../db';
import { TeamMember } from '../../interfaces/TeamMember';

export const Team = z.object({
    name: z.string().min(1),
    members: z.array(TeamMember),
});

export const TeamData = z.object({
    userClicks: z.number().min(0),
    teamClicks: z.number().min(0),
});

export type Team = z.infer<typeof Team>;
export type TeamData = z.infer<typeof TeamData>;
export type TeamWithId = WithId<Team> | null;
export const Teams = db.collection<Team>('teams');