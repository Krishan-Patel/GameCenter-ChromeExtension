import { scoreCard } from "./Class Definitions.js";
import { eplSetData, mlbSetData, nbaSetData, NCAABSetData, nhlSetData } from "./NBA.js";
import { nflSetData } from "./NFL.js";

export function fetchInfo(url) {
    let promise = fetch(url)
        .then(response => response.json())
        .then(function (response) { return response.events })
        .then(function (events) {
            let leagueArray = [url];
            events.forEach(event => {
                let card;
                card = new scoreCard(
                    event.competitions[0].competitors[0].team.name,
                    event.competitions[0].competitors[0].team.logo,
                    event.competitions[0].competitors[0].records[0].summary,
                    event.competitions[0].competitors[0].score,
                    event.competitions[0].competitors[1].team.name,
                    event.competitions[0].competitors[1].team.logo,
                    event.competitions[0].competitors[1].records[0].summary,
                    event.competitions[0].competitors[1].score,
                    event.id,
                    event.status.type.shortDetail,
                    event.status.type.state,
                    event.links[0].href
                )
                if (url === "http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard") {
                    card.league = 'NFL';
                    nflSetData(card, event,)
                } else if (url === "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard") {
                    card.league = 'NBA';
                    nbaSetData(card, event);
                } else if (url === "http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard") {
                    card.league = 'NHL';
                    nhlSetData(card, event);
                } else if (url === "http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard") {
                    card.league = 'MLB';
                    mlbSetData(card, event);
                } else if (url === "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard") {
                    card.league = 'CFL';
                    nflSetData(card, event);
                } else if (url === "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard") {
                    card.league = 'NCAAB';
                    NCAABSetData(card, event);
                }else { 
                    card.league = 'EPL';
                    eplSetData(card,event);
                }

                if (event.status.type.state == 'pre') {
                    try {
                        card.odds = event.competitions[0].odds[0].details;
                        card.overUnder = event.competitions[0].odds[0].overUnder;
                    }
                    catch (error) { console.log(error) } // need this try error incase odds have not been set yet
                }
                else if (event.status.type.state == 'in') {
                    card.home.linescore = event.competitions[0].competitors[0].linescores;
                    card.away.linescore = event.competitions[0].competitors[1].linescores;
                    try {
                        card.lastPlayImg = event.competitions[0].situation.lastPlay.athletesInvolved[0].headshot;
                        card.lastPlayText = event.competitions[0].situation.lastPlay.text;
                    } catch (error) { }
                }
                else {
                    card.home.linescore = event.competitions[0].competitors[0].linescores;
                    card.away.linescore = event.competitions[0].competitors[1].linescores;
                }
                card.createCard()
                leagueArray.push(card)
            });
            return leagueArray;
        })
        .catch(error => {
            console.log(error)
        })

    return promise;
}

export function updateData(gamesArray, updatecard) {
    for (let j = 0; j < gamesArray.length; j++) {
        fetch(gamesArray[j][0])
            .then(response => response.json())
            .then(json => json.events)
            .then(events => {
                let leagueArray = [gamesArray[j][0]];
                events.forEach(game => {
                    let match = false;
                    for (let i = 0; i < events.length; i++) {
                        if (game.id === gamesArray[j][i + 1].gameId) {
                            updateInfo(gamesArray[j][i + 1], game, updatecard);
                            match = true;
                            leagueArray.push(gamesArray[j][i + 1]);
                        }
                    }
                    if (!match) {
                        throw Error(gamesArray[j][0]);
                    }
                })
                gamesArray[j] = leagueArray;
                chrome.storage.local.set({ 'gamesData': gamesArray })
            })
            .catch(function (error) {
                console.log(error)
                gamesArray = gamesArray.filter(league => {
                    return league[0] != error.message
                })
                console.log('data out of sync')
                fetchInfo(error.message)
                    .then(leagueArray => {
                        gamesArray.push(leagueArray)
                        chrome.storage.local.set({ 'gamesData': gamesArray })
                        location.reload();
                    })

            })
    }
}


function updateInfo(game, event, updatecard) {
    if (event.status.type.state === "pre") {
        try {
            game.odds = event.competitions[0].odds[0].details;
            game.overUnder = event.competitions[0].odds[0].overUnder;
            game.status = event.status.type.state;
            game.details = event.competitions[0].status.type.shortDetail;
        } catch { }

    } else if (event.status.type.state == "in") {
        game.home.linescore = event.competitions[0].competitors[0].linescores;
        game.away.linescore = event.competitions[0].competitors[1].linescores;
        game.status = event.status.type.state;
        game.details = event.competitions[0].status.type.shortDetail;
        game.home.score = event.competitions[0].competitors[0].score;
        game.away.score = event.competitions[0].competitors[1].score;
        try {
            game.lastPlayImg = event.competitions[0].situation.lastPlay.athletesInvolved[0].headshot;
            game.lastPlayText = event.competitions[0].situation.lastPlay.text;
        } catch (error) { }
        if (game.league === 'NFL' || game.league === 'CFL') {
            nflSetData(game, event)
        } else if (game.league === 'NBA'){
            nbaSetData(game, event);
        } else if (game.league === 'NHL'){
            nhlSetData(game,event); 
        } else if (game.league === 'MLB') { 
            mlbSetData(game,event); 
        } else if (game.league === 'EPL'){
            eplSetData(game, event); 
        } else if (game.league === 'NCAAB'){
            NCAABSetData(game,event); 
        }
    } else {
        game.home.linescore = event.competitions[0].competitors[0].linescores;
        game.away.linescore = event.competitions[0].competitors[1].linescores;
        game.status = event.status.type.state;
        game.details = event.competitions[0].status.type.shortDetail;
        game.home.score = event.competitions[0].competitors[0].score;
        game.away.score = event.competitions[0].competitors[1].score;
        game.home.record = event.competitions[0].competitors[0].records[0].summary;
        game.away.record = event.competitions[0].competitors[0].records[0].summary;
        if (game.league === 'NFL' || game.league === 'CFL') {
            nflSetData(game, event)
        } else if (game.league === 'NBA'){
            nbaSetData(game, event);
        } else if (game.league === 'NHL'){
            nhlSetData(game,event); 
        } else if (game.league === 'MLB') { 
            mlbSetData(game,event); 
        } else if (game.league === 'EPL'){
            eplSetData(game, event); 
        } else if (game.league === 'NCAAB'){
            NCAABSetData(game,event); 
        }

    }
    if (updatecard) {
        game.updateScoreCard();
    }
}
