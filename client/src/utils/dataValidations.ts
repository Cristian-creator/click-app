import { validate as uuidValidate } from 'uuid';

export const isValidUuid = (uuid: string) => uuidValidate(uuid);

export const isValidTeamName = (teamName: string) => teamName.length < 30 && !teamName.includes(' ');