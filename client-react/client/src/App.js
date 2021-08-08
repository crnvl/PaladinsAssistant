import './App.css';
import React from 'react';
import { Placeholder } from './components/userStatsPlaceholder';
import { MatchUser } from './components/userStats';
const http = require('http')
const dataBlock = [];

function App() {

  startSystem()

  console.log(dataBlock);
  return (
  <>
    <div className="container">
        <div className="row lg">
          <h2>Team 1</h2>
            <MatchUser name="someone" championUrl="https://raw.githubusercontent.com/PaladinsDev/Assets/master/champions/Drogoz/drogoz.jpg" level="243" champion="Drogoz" championLevel="34" winrate="35.53%" ranking="Grandmaster"></MatchUser>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
        </div>
        <div class="row lg">
          <h2>Team 2</h2>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
            <Placeholder></Placeholder>
        </div>
    </div>
    </>
  );
}

function startSystem() {
  setInterval(requestMatchData('z1unknown'), 5000); //time is in ms
}

function requestMatchData(name) {
  http.get(`http://localhost:5000/api/games/paladins/user/${name}/status`, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    dataBlock.push(JSON.parse(data).explanation)
    console.log(data)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}

export default App;
