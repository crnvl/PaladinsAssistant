import './App.css';
import React, { useState, useEffect } from 'react';
import { Placeholder } from './components/userStatsPlaceholder';
import { MatchUser } from './components/userStats';

function App() {

  const [response, setResponse] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
        fetch(`http://localhost:5000/api/games/paladins/user/jofroliftsTTV/status`)
            .then(r => r.json()).then(setResponse);
    }, 10000)
    return () => clearInterval(interval);
  }, [])

  console.log(response);
  const team1 = [];
  const team2 = [];

  if(response === undefined || response.status === 'In Lobby' || response.status === 'God Selection') {
      for (let i = 0; i < 5; i++) {
        team1.push(<Placeholder></Placeholder>)
        team2.push(<Placeholder></Placeholder>)
      }
  }else {
    for (let x = 0; x < 2; x++) {
      for (let i = 0; i < response.players.length; i++) {
        if(x === 0) {
          if(response.players[i].team === 1) {
            team1.push(
              <MatchUser name={response.players[i].name} level={response.players[i].level} champion={response.players[i].champion} championLevel={response.players[i].championLevel} winrate={response.players[i].wins} ranking={response.players[i].ranking}></MatchUser>
            )
          }
        }else if(x === 1) {
          if(response.players[i].team === 2) {
            team2.push(
              <MatchUser name={response.players[i].name} level={response.players[i].level} champion={response.players[i].champion} championLevel={response.players[i].championLevel} winrate={response.players[i].wins} ranking={response.players[i].ranking}></MatchUser>
            )
          }
        }
      }
    }
  }


  return (
  <>
    <div className="container">
        <div className="row lg">
          <h2>Team 1</h2>
            {team1}
        </div>
        <div class="row lg">
          <h2>Team 2</h2>
            {team2}
        </div>
    </div>
    </>
  );
}

export default App;
