import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import config from '../../config';
import { RootState } from '../../store/store';
import { selectCurrentMemberId, selectLeadingTeams, updateLeadingTeam } from '../../store/teams/teamsSlice';
import { isValidUuid } from '../../utils/dataValidations';
import spaceAsThousandsSeparator from '../../utils/spaceAsThousandsSeparator';
import PageContent from '../PageContent/PageContent';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const TeamPage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const teams = useTypedSelector(selectLeadingTeams).leadingTeams;
  const getCurrentMemberId = useTypedSelector(selectCurrentMemberId);
  const teamName = window.location.pathname.slice(1);
  const currentTeamData = teams.filter((team) => team.name === teamName )[0]; 
  const { clientURL } = config;
  const invitationURL = `${ clientURL }/${ teamName }`;

  const handleClick = () => {
    const data = {
        name: teamName, 
        memberId: getCurrentMemberId,
        numberOfUserClicks: 1,
    };
    
    if(isValidUuid(getCurrentMemberId)) {
        dispatch(updateLeadingTeam(teamName));
        axios.post('/api/v1/teams/get-or-insert', data);
    }
  }
  
  return (
    <div className='team-page-container'>
        <div className="team-page-header">
            <h4> Clicking for team <b> { teamName } </b> </h4>
            <div className="team-page-invitation">
                <span> Too lazy to click? Let your pals click for you: </span>
                <input type="text" readOnly value={ invitationURL } name="invitation-link" />
            </div>
        </div>
        <PageContent>
            <button onClick={ handleClick } className='click-button'> click! </button>
            <div className="team-data">
                <div>
                    <h6> Your clicks: </h6>
                    <h3> { spaceAsThousandsSeparator(currentTeamData?.userClicks || 0) } </h3>
                </div>
                <div>
                    <h6> Team clicks: </h6>
                    <h3> { spaceAsThousandsSeparator(currentTeamData?.teamClicks || 0) } </h3>
                </div>
            </div>
        </PageContent>
    </div>
  )
}

export default TeamPage;
