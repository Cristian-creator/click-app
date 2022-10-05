import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeadingTeamData, TeamsState } from './types';
import { RootState } from '../store';
import sortLeadingTeams from '../../utils/compareValues';

const initialState: TeamsState = {
    currentMemberId: '',
    leadingTeams: [],
};

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
      setCurrentMember(
        state: TeamsState,
        action: PayloadAction<string>
      ) {
        state.currentMemberId = action.payload;
      },
      setLeadingTeams(
        state: TeamsState,
        action: PayloadAction<LeadingTeamData[]>
      ) {
        state.leadingTeams = [...action.payload];
      },
      updateOrInsertNewLeadingTeam(
        state: TeamsState,
        action: PayloadAction<LeadingTeamData>
      ) {
        const teamIndex = state.leadingTeams.findIndex((team) => team.name === action.payload.name);

        if(teamIndex >= 0) {
          state.leadingTeams[teamIndex].userClicks++;
          state.leadingTeams[teamIndex].teamClicks++;
        } else {
          state.leadingTeams = [...state.leadingTeams, action.payload];
        }

        state.leadingTeams = sortLeadingTeams(state.leadingTeams); 

      },
      updateLeadingTeam(
        state: TeamsState,
        action: PayloadAction<string>
      ) {
        const teamIndex = state.leadingTeams.findIndex((team) => team.name === action.payload);

        state.leadingTeams[teamIndex].userClicks++;
        state.leadingTeams[teamIndex].teamClicks++;

        state.leadingTeams = sortLeadingTeams(state.leadingTeams);
      },
    },
  });

  // actions
  export const { setCurrentMember, setLeadingTeams, updateOrInsertNewLeadingTeam, updateLeadingTeam } = teamsSlice.actions;

  // selectors
  export const selectCurrentMemberId = (state: RootState) => state.teams.currentMemberId;
  export const selectLeadingTeams = (state: RootState) => state.teams;

  export default teamsSlice.reducer;