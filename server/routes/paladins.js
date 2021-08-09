const {
    response
} = require('express');
const paladinsJS = require('paladins.js');
const credentials = require('../credentials.json');
const fs = require('fs');

let api = new paladinsJS.API({
    devId: credentials.developerId,
    authKey: credentials.authorizationKey
});

const paladinsRouter = function (app) {
    app.get('/api/games/paladins/user/:username/status', async (req, res) => {

        api.getDataUsage().then(async (response) => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
        const id = await api.getPlayerIdByName(req.params.username).catch(error => {
            console.log(error)
        });
        if (id[0].player_id === undefined) {
            res.json({
                error: "user doesn't exist",
                errorCode: 2,
            })
            return;
        }
        const stats = await api.getPlayerStatus(id[0].player_id).catch(error => {
            console.log(error)
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
                        player = await api.getPlayer(response[i].playerId);
                    } catch (error) {
                        console.log(error)
                    }


                    const championInfo = await api.getChampionCards(response[i].ChampionId);
                    players.push({
                        "name": response[i].playerName,
                        "level": response[i].Account_Level,
                        "id": response[i].playerId,
                        "champion": response[i].ChampionName,
                        "championLevel": response[i].ChampionLevel,
                        "championSkin": response[i].Skin,
                        "team": response[i].taskForce,
                        "ranking": response[i].Tier,
                        "wins": player.Wins,
                        "losses": player.Losses,
                        "icon": championInfo[0].championIcon_URL
                    })
                }

                res.json({
                    "status": stats.status_string,
                    "map": response[0].mapGame,
                    "matchId": response[0].Match,
                    players
                })
            }).catch(error => {
                console.log(error)
            })
    })

    app.get('/api/testing', async (req, res) => {
        res.sendStatus(200);
    })

    app.get('/api/games/paladins/user/:username', async (req, res) => {

        api.getDataUsage().then(async (response) => {
            console.log(response)
        }).catch(error => {
            throw(error);
        })

        const data = await api.getPlayerIdByName(req.params.username).catch(error => {
            throw(error);
        });

        if (data[0].player_id === undefined) {
            res.json({
                error: "user doesn't exist",
                errorCode: 2,
            })
            return;
        }

        api.getPlayer(data[0].player_id).then(async (response) => {
            res.json(
                {
                    "name": response.Name,
                    "avatar": response.AvatarURL,
                    "playtime": response.HoursPlayed,
                    "level": response.Level,
                    "wins": response.Wins,
                    "losses": response.Losses,
                    "region": response.Region,
                    "title": response.Title
                }
            );
        }).catch(error => {
            throw(error);
        })
    })
}

module.exports = paladinsRouter;