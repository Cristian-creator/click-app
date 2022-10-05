import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import { setCurrentMember, setLeadingTeams } from './store/teams/teamsSlice';
import { v4 as uuidv4 } from 'uuid';
import { isValidUuid } from './utils/dataValidations';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import TeamPage from './components/TeamPage/TeamPage';

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
  }, [memberId, dispatch]);

  useEffect(() => {
    axios.post('/api/v1/teams/leaderboard', { memberId })
      .then((res) => {
        dispatch(
          setLeadingTeams(res.data)
        );
      })
      .catch(() => {});
  }, [dispatch, memberId]);

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
