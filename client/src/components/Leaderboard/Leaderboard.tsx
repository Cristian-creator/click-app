import React from 'react';

// Redux
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import config from '../../config';
import { RootState } from '../../store/store';
import { selectLeadingTeams } from '../../store/teams/teamsSlice';
import spaceAsThousandsSeparator from '../../utils/spaceAsThousandsSeparator';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Leaderboard: React.FC<{}> = () => {
  const { leadingTeams } = useTypedSelector(selectLeadingTeams);
  const { leaderboard: { numberOfDisplayedTeamsOnDetailsPage, numberOfDisplayedTeamsOnHomePage } } = config;

  const isHomePage = window.location.pathname === '/';
  const teamName = window.location.pathname.slice(1);
  const teamIndex = leadingTeams.findIndex((team) => team.name === teamName);

  const getDisplayedTeams = () => {
    if(isHomePage) return leadingTeams.slice(0, numberOfDisplayedTeamsOnHomePage);
    if(teamIndex < numberOfDisplayedTeamsOnDetailsPage) return leadingTeams.slice(0, numberOfDisplayedTeamsOnDetailsPage);
    
    return leadingTeams.slice(teamIndex - numberOfDisplayedTeamsOnDetailsPage + 1, teamIndex + 1);
  }
  
  const getTeamIndex = (name: string) => leadingTeams.findIndex((team) => team.name === name);

  const numberOfEmptyRows = () => {
    let num;

    if (isHomePage) {
        num = numberOfDisplayedTeamsOnHomePage - leadingTeams.length;
    } else {
        num = numberOfDisplayedTeamsOnDetailsPage - leadingTeams.length; 
    }
    
    return num > 0 ? num : 0; 
  };  

  const emptyRows = Array.from(Array(numberOfEmptyRows()).keys()).map((val) => <tr key={ val } ><td/><td/><td/></tr>);

  return (
    <div>
        <table className='leaderboard-table' >
            <thead>
                <tr>
                    <th></th>
                    <th> Team </th>
                    <th> Clicks </th>
                </tr>
            </thead>
            <tbody>
                {
                    getDisplayedTeams().map(({ name, teamClicks }) => (
                        <tr key={ name } className={ `${name === teamName && 'current-team'}` } >
                            <td> { getTeamIndex(name) + 1 } </td>
                            <td> { name } </td>
                            <td> { spaceAsThousandsSeparator( teamClicks ) } </td>
                        </tr>
                    ))
                }
                {
                    emptyRows
                }
            </tbody>
        </table>        
    </div>
  )
}

export default Leaderboard;
