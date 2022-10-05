import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LeadingTeamData, Team, TeamData, TeamsState } from './types';
import { RootState } from '../store';
import sortLeadingTeams from '../../utils/compareValues';

const initialState: TeamsState = {
    currentMemberId: '',
    leadingTeams: [],
};

export const teamsSlice = createSlice({
    // A name, used in action types:
    name: "todos",
    
    // The initial state:
    initialState,
    
    // An object of "case reducers". 
    // Key names will be used to generate actions:
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

        if(teamIndex > 0) {
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
      // insertTeam(
      //   state: TeamsState,
      //   action: PayloadAction<Team[]>
      // ) {
      //   state.leadingTeams = [...action.payload];
      // },
    //   toggleTodo(
    //     // You can skip typing the state,
    //     // it will be inferred from the `initialState`.
    //     // I prefer to explicitly type everything I can
    //     // but this is not obligatory.
    //     // For example, this will work as well:
    //     state, 
    //     action: PayloadAction<TodoId>
    //   ) {
    //     const index = state.list.findIndex(
    //       ({ id }) => id === action.payload);
        
    //     if (index) {
    //       state.list[index].completed = !state.list[index].completed;
    //     }
    //   },
    },
  });

  // actions
  export const { setCurrentMember, setLeadingTeams, updateOrInsertNewLeadingTeam, updateLeadingTeam } = teamsSlice.actions;

  // selectors
  export const selectCurrentMemberId = (state: RootState) => state.teams.currentMemberId;
  export const selectLeadingTeams = (state: RootState) => state.teams;

  export default teamsSlice.reducer;