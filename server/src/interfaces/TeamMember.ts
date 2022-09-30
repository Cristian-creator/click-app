import * as z from 'zod';

export const TeamMember = z.object({
    memberId: z.string(),
    clicks: z.number(),
});

export type TeamMember = z.infer<typeof TeamMember>;