import './App.css';
import React, { useState, useEffect } from 'react';
import { Placeholder } from './components/userStatsPlaceholder';
import { MatchUser } from './components/userStats';
import { ranks } from './ranks';
import { MainMatchUser } from './components/mainUserCard';

function App() {

  const [response, setResponse] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
        const username = document.getElementById('ign').value;

        if(username === '')
          return;

        fetch(`https://api.4c3711.xyz/api/games/paladins/user/${username}/status`)
            .then(r => r.json()).then(setResponse);
    }, 20000)
    return () => clearInterval(interval);
  }, [])

  const [responseSelf, setResponseSelf] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const username = document.getElementById('ign').value;

      if(username === '')
        return;

        fetch(`https://api.4c3711.xyz/api/games/paladins/user/${username}`)
            .then(r => r.json()).then(setResponseSelf);
    }, 120000)
    return () => clearInterval(interval);
  }, [])

  const team1 = [];
  const team2 = [];
  const gameInfo = [];

  if(response === undefined || response.status !== 'In Game' || response.matchId === 0) {
      for (let i = 0; i < 5; i++) {
        team1.push(<Placeholder></Placeholder>)
        team2.push(<Placeholder></Placeholder>)
      }
  }else {

    gameInfo.push(<h2><span className="badge bg-primary">{response.map}</span></h2>)

    for (let x = 0; x < 2; x++) {
      for (let i = 0; i < response.players.length; i++) {

        var playerJson = response.players[i];
        var skin = playerJson.championSkin;

        var mode = 'CASUAL';
        if(response.map.toString().startsWith('Ranked'))
          mode = 'Ranked';

        var winrate = (playerJson.wins / (playerJson.wins + playerJson.losses) ) * 100;
        winrate = `${winrate.toFixed(2)}`;

        var name = playerJson.name, winrateDisplay = winrate;
        if(playerJson.name === '') {
          name = 'Private Account';
          winrateDisplay = '---';
        }

        var rankingDisplay = 'Unranked';
        if(playerJson.ranking !== 0)
          rankingDisplay = ranks[playerJson.ranking];

        if(x === 0) {
          if(playerJson.team === 1) {

            team1.push(
              <MatchUser name={name} level={playerJson.level} champion={playerJson.champion} championLevel={playerJson.championLevel} winrate={winrateDisplay + '%'} ranking={rankingDisplay} championSkin={skin} mode={mode} championUrl={playerJson.icon}></MatchUser>
            )
          }
        }else if(x === 1) {
          if(playerJson.team === 2) {
            team2.push(
              <MatchUser name={name} level={playerJson.level} champion={playerJson.champion} championLevel={playerJson.championLevel} winrate={winrateDisplay  + '%'} ranking={rankingDisplay} championSkin={skin} mode={mode} championUrl={playerJson.icon}></MatchUser>
            )
          }
        }
      }
    }
  }



  const selfUser = [];
  if(responseSelf === undefined || responseSelf.name === '')
    selfUser.push(<Placeholder></Placeholder>)
  else {

    winrate = (responseSelf.wins / (responseSelf.wins + responseSelf.losses) ) * 100;
    winrate = `${winrate.toFixed(2)}%`;
    selfUser.push(<MainMatchUser avatar={responseSelf.avatar} name={responseSelf.name} title={responseSelf.title} level={responseSelf.level} winrate={winrate} playtime={responseSelf.playtime} region={responseSelf.region} status={response}></MainMatchUser>)
  }

  return (
    <>
    <div className="container-fluid">
      <div className="col-sm-1">
        <div className="row lg-12">
          <br></br>
        </div>
      </div>

      {/* Site with padding */}
      <div className="col h-90">
        <div className="row">
          <div className="row-md-1">
          </div>
          <div className="col-md-3">
            {selfUser}
          </div>
          <div className="col-md">
            {gameInfo}
            <div className="row lg">
              <h2><span className="badge bg-secondary">Team 1</span></h2>
              {team1}
            </div>
            <br></br>
            <div className="row lg">
              <h2><span className="badge bg-secondary">Team 2</span></h2>
              {team2}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
