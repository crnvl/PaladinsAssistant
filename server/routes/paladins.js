const {
    response
} = require('express');
const paladinsJS = require('paladins.js');
const credentials = require('../credentials.json');

let api = new paladinsJS.API({
    devId: credentials.developerId,
    authKey: credentials.authorizationKey
});

const paladinsRouter = function (app) {
    app.get('/api/games/paladins/user/:username/status', async (req, res) => {

        const id = await api.getPlayerIdByName(req.params.username).then((response) => {
            return response
        });

        const stats = await api.getPlayerStatus(id[0].player_id).then((response) => {
            return response
        });

        if (stats.status_string != "In Game") {
            res.json({
                error: "user not in match",
                errorCode: 1,
                status: stats.status_string
            })
            return;
        }

        api.getActiveMatchDetails(stats.Match)
            .then(async (response) => {
                const players = [];

                for (let i = 0; i < response.length; i++) {
                    var player = "";
                    try {
                        player = await api.getPlayer(response[i].playerId).then((response) => {
                            return response;
                        })
                    } catch (error) {
                        
                    }

                    players.push({
                        "name": response[i].playerName,
                        "level": response[i].Account_Level,
                        "id": response[i].playerId,
                        "champion": response[i].ChampionName,
                        "championLevel": response[i].ChampionLevel,
                        "team": response[i].taskForce,
                        "ranking": response[i].Tier,
                        "wins": player.Wins,
                        "losses": player.Losses
                    })
                }

                res.json({
                    "status": stats.status_string,
                    "map": response[0].mapGame,
                    "matchId": response[0].Match,
                    players
                })
            })
    })
}

module.exports = paladinsRouter;