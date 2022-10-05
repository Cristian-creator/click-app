import { LeadingTeamData } from "../store/teams/types";

const compareValues = (a: number, b: number) => {
    if ( a < b ){
      return 1;
    }
    if ( a > b ){
      return -1;
    }
    return 0;
};

const sortLeadingTeams = (teams: LeadingTeamData[]) => teams.sort((a, b) => compareValues(a.teamClicks, b.teamClicks));


export default sortLeadingTeams;