import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { selectCurrentMemberId, setCurrentMember, setLeadingTeams } from './store/teams/teamsSlice';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import axios from 'axios';

import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { isValidUuid } from './utils/dataValidations';
import TeamPage from './components/TeamPage/TeamPage';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
const memberId: string = localStorage.getItem('memberId') || '';

  const dispatch = useDispatch();
 
  useEffect(() => {
    if(!memberId || !isValidUuid(memberId)) {
      const generatedMemberId = uuidv4();
      
      dispatch(setCurrentMember(generatedMemberId));
      localStorage.setItem('memberId', generatedMemberId);
    } else if (isValidUuid(memberId)) {
      dispatch(setCurrentMember(memberId));
    }
  }, []);

  useEffect(() => {
    axios.post('/api/v1/teams/leaderboard', { memberId })
      .then((res) => {
        dispatch(
          setLeadingTeams(res.data)
        );
      })
      .catch(() => {});
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/:teamName' element={ <TeamPage /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
