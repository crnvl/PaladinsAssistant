import './App.css';
import React, { useState, useEffect } from 'react';
import { Placeholder } from './components/userStatsPlaceholder';
import { MatchUser } from './components/userStats';
import { ranks } from './ranks';

function App() {

  const [response, setResponse] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
        fetch(`http://localhost:5000/api/games/paladins/user/UkhantKillMe/status`)
            .then(r => r.json()).then(setResponse);
    }, 10000)
    return () => clearInterval(interval);
  }, [])

  console.log(response);
  const team1 = [];
  const team2 = [];

  if(response === undefined || response.status === 'In Lobby' || response.status === 'God Selection' || response.status === 'Offline' || response.matchId === 0) {
      for (let i = 0; i < 5; i++) {
        team1.push(<Placeholder></Placeholder>)
        team2.push(<Placeholder></Placeholder>)
      }
  }else {
    for (let x = 0; x < 2; x++) {
      for (let i = 0; i < response.players.length; i++) {

        var playerJson = response.players[i];
        var skin = playerJson.championSkin;

        var mode = 'CASUAL';
        if(response.map.toString().startsWith('Ranked'))
          mode = 'Ranked';

        var winrate = (playerJson.wins / (playerJson.wins + playerJson.losses) ) * 100;
        winrate = `${winrate.toFixed(2)}%`;

        var name = playerJson.name, winrateDisplay = winrate;
        if(playerJson.name === '') {
          name = 'Private Account';
          winrateDisplay = '---'
        }

        var rankingDisplay = 'Unranked';
        if(playerJson.ranking !== 0)
          rankingDisplay = ranks[playerJson.ranking];

        if(x === 0) {
          if(playerJson.team === 1) {
            team1.push(
              <MatchUser name={name} level={playerJson.level} champion={playerJson.champion} championLevel={playerJson.championLevel} winrate={winrateDisplay} ranking={rankingDisplay} championSkin={skin} mode={mode} championUrl={playerJson.icon}></MatchUser>
            )
          }
        }else if(x === 1) {
          if(playerJson.team === 2) {
            team2.push(
              <MatchUser name={name} level={playerJson.level} champion={playerJson.champion} championLevel={playerJson.championLevel} winrate={winrateDisplay} ranking={rankingDisplay} championSkin={skin} mode={mode} championUrl={playerJson.icon}></MatchUser>
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
