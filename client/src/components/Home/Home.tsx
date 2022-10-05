import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { isValidTeamName, isValidUuid } from '../../utils/dataValidations';
import PageContent from '../PageContent/PageContent';

// Redux
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from '../../store/store';
import { updateOrInsertNewLeadingTeam, selectCurrentMemberId, selectLeadingTeams } from '../../store/teams/teamsSlice';
import { useDispatch } from 'react-redux';


const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home: React.FC<{}> = () => {
  const getCurrentMemberId = useTypedSelector(selectCurrentMemberId);
  const { leadingTeams } = useTypedSelector(selectLeadingTeams);
  
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
        name: inputValue, 
        memberId: getCurrentMemberId,
        numberOfUserClicks: 1,
    };

    const currentTeam = leadingTeams.filter((team) => team.name === inputValue)[0];

    const newLeadingTeam = {
      name: inputValue,
      userClicks: currentTeam?.userClicks || 1,
      teamClicks: currentTeam?.teamClicks || 1,
    };

    if(inputError) return;
    
    if(isValidUuid(getCurrentMemberId)) {
        dispatch(updateOrInsertNewLeadingTeam(newLeadingTeam));

        axios.post('/api/v1/teams/get-or-insert', data)
          .then((res) => {
            navigate(`/${inputValue}`);
          });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target;
    setInputValue(value);

    if(value.length > 0 && !isValidTeamName(value)) {
      setInputError(true);
    } else if (inputError) {
      setInputError(false);
    }
  };

  return (
    <div>
        <div className="quote">
            <p> "It's really simple, you just need to click as fast as you can." </p>
            <cite> - anonymous </cite>
        </div>
        <PageContent>
            <form onSubmit={ handleSubmit } className='team-name-form'>
                <div className="input-container">
                    <label htmlFor="team-name-input"> Enter your team name: </label>
                    <input 
                        required 
                        onChange={ handleChange }
                        type="text"
                        name=""
                        id="team-name-input"
                        placeholder="Your mom"
                    />
                </div>
                <button className='click-button'> click! </button>
                { inputError && 
                    <p className="input-error"> Team name contains forbidden characters </p>
                }
            </form>
            <div className="top-teams-heading">
                <h5> TOP 10 Clickers </h5>
            </div>
        </PageContent>
    </div>
  )
}

export default Home;
