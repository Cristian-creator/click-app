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

export const TeamDataWithName = z.object({
    name: z.string().min(1),
    userClicks: z.number().min(0),
    teamClicks: z.number().min(0),
});

export const GetOrInsertTeam = z.object({
    name: z.string().min(1),
    memberId: z.string().min(1),
    numberOfUserClicks: z.number().min(0),
});

export const MemberId = z.object({
    memberId: z.string().min(1),
});

export type Team = z.infer<typeof Team>;
export type GetOrInsertTeam = z.infer<typeof GetOrInsertTeam>;
export type TeamData = z.infer<typeof TeamData>;
export type TeamDataWithName = z.infer<typeof TeamDataWithName>;
export type MemberId = z.infer<typeof MemberId>;
export const Teams = db.collection<Team>('teams');