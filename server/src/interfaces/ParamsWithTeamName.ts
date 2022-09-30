import { ObjectId } from 'mongodb';
import * as z from 'zod';

export const ParamsWithTeamName = z.object({
    teamName: z.string().min(1),
});

export type ParamsWithTeamName = z.infer<typeof ParamsWithTeamName>;