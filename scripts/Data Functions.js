import { scoreCard } from "./Class Definitions.js";
import {
  eplSetData,
  mlbSetData,
  nbaSetData,
  NCAABSetData,
  nhlSetData,
  nflSetData,
} from "./Leagues.js";

// hideUndefined() scans the entire page for images and hides any unavaliable images (unkown source) to remove broken images.
export function hideUndefined() {
  document.querySelectorAll("img").forEach((img) => {
    if (
      img.src ==
        "chrome-extension://kaegdnmilijaliffkaeaadihicbklcmn/undefined" ||
      img.src == "chrome-extension://kaegdnmilijaliffkaeaadihicbklcmn/"
    ) {
      img.style.display = "none";
    } else {
      img.style.display = "revert";
    }
  });
}

// fetchInfo(url) uses the fetch API to get info from URL and creates an array of GameCard objects corresponding to the 
export function fetchInfo(url) {
  let promise = fetch(url)
    .then((response) => response.json())
    .then(function (response) {
      return response.events;
    })
    .then(function (events) {
      let leagueArray = [url];
      events.forEach((event) => {
        try {
          let card;
          let homeRecord, awayRecord;
          try {
            homeRecord =
              event.competitions[0].competitors[0].records[0].summary;
          } catch {
            homeRecord = null;
          }
          try {
            awayRecord =
              event.competitions[0].competitors[1].records[0].summary;
          } catch {
            awayRecord = null;
          }
          card = new scoreCard(
            event.competitions[0].competitors[0].team.name,
            event.competitions[0].competitors[0].team.logo,
            homeRecord,
            event.competitions[0].competitors[0].score,
            event.competitions[0].competitors[1].team.name,
            event.competitions[0].competitors[1].team.logo,
            awayRecord,
            event.competitions[0].competitors[1].score,
            event.id,
            event.status.type.shortDetail,
            event.status.type.state,
            event.links[0].href,
            event.date
          );
          if (
            url ===
            "http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard"
          ) {
            card.league = "NFL";
            nflSetData(card, event);
          } else if (
            url ===
            "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
          ) {
            card.league = "NBA";
            nbaSetData(card, event);
          } else if (
            url ===
            "http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard"
          ) {
            card.league = "NHL";
            nhlSetData(card, event);
          } else if (
            url ===
            "http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard"
          ) {
            card.league = "MLB";
            mlbSetData(card, event);
          } else if (
            url ===
            "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard"
          ) {
            card.league = "CFL";
            nflSetData(card, event);
          } else if (
            url ===
            "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard"
          ) {
            card.league = "NCAAB";
            NCAABSetData(card, event);
          } else {
            card.league = "EPL";
            eplSetData(card, event);
          }

          if (event.status.type.state == "pre") {
            try {
              card.odds = event.competitions[0].odds[0].details;
              card.overUnder = event.competitions[0].odds[0].overUnder;
            } catch (error) {
              console.log(error);
            } // need this try error incase odds have not been set yet
          } else if (event.status.type.state == "in") {
            card.home.linescore =
              event.competitions[0].competitors[0].linescores;
            card.away.linescore =
              event.competitions[0].competitors[1].linescores;
            try {
              card.lastPlayImg =
                event.competitions[0].situation.lastPlay.athletesInvolved[0].headshot;
              card.lastPlayText = event.competitions[0].situation.lastPlay.text;
            } catch (error) {}
          } else {
            card.home.linescore =
              event.competitions[0].competitors[0].linescores;
            card.away.linescore =
              event.competitions[0].competitors[1].linescores;
          }
          card.createCard();
          leagueArray.push(card);
        } catch (error) {
          console.log(error);
        }
      });
      return leagueArray;
    })
    .catch((error) => {
      console.log(error);
    });

  return promise;
}

// updateData(gamesArray, updatecard) updates the GameCard objects in gamesArray, if updatecard is true updates the 
//   display with the new information as well. 
export function updateData(gamesArray, updatecard) {
  for (let j = 0; j < gamesArray.length; j++) {
    fetch(gamesArray[j][0])
      .then((response) => response.json())
      .then((json) => json.events)
      .then((events) => {
        let leagueArray = [gamesArray[j][0]];
        events.forEach((game) => {
          let match = false;
          if (game.competitions[0].competitors[0].team.name !== "TBD") {
            for (let i = 1; i < gamesArray[j].length; i++) {
              if (game.id === gamesArray[j][i].gameId) {
                match = true;
                updateInfo(gamesArray[j][i], game, updatecard);
                leagueArray.push(gamesArray[j][i]);
              }
            }
            if (!match) {
              throw Error(gamesArray[j][0]);
            }
          }
        });
        if (leagueArray) { 
        gamesArray[j] = leagueArray;
        chrome.storage.local.set({ gamesData: gamesArray });
        if (updatecard) {
          hideUndefined();
        }
      } else { 
        console.log(leagueArray)
        throw Error(gamesArray[j][0])
      }
      })
      .catch(function (error) {
        console.log(error);
        // gamesArray = gamesArray.filter(league => {
        //     return league[0] != error.message
        // })
        console.log("data out of sync");
        console.log(error.message);
        fetchInfo(error.message).then((leagueArray) => {
          if(leagueArray) { 
          gamesArray[j] = leagueArray;
          chrome.storage.local.set({ gamesData: gamesArray });
          if (updatecard) {
            hideUndefined();
          }
          location.reload();
        }
        });
      });
  }
}


// updateInfo(game, event, updatecard) updates the information in the ScoreCard object game based on the information in the json object event. 
// if update card is true updates the display to reflect the updates information. 
function updateInfo(game, event, updatecard) {
  if (event.status.type.state === "pre") {
    try {
      game.odds = event.competitions[0].odds[0].details;
      game.overUnder = event.competitions[0].odds[0].overUnder;
      game.status = event.status.type.state;
      game.details = event.competitions[0].status.type.shortDetail;
      game.date = event.date;
    } catch {}
  } else {
    game.home.linescore = event.competitions[0].competitors[0].linescores;
    game.away.linescore = event.competitions[0].competitors[1].linescores;
    game.status = event.status.type.state;
    game.details = event.competitions[0].status.type.shortDetail;
    game.home.score = event.competitions[0].competitors[0].score;
    game.away.score = event.competitions[0].competitors[1].score;
    game.date = event.date;
    if (game.league === "NFL" || game.league === "CFL") {
      nflSetData(game, event);
    } else if (game.league === "NBA") {
      nbaSetData(game, event);
    } else if (game.league === "NHL") {
      nhlSetData(game, event);
    } else if (game.league === "MLB") {
      mlbSetData(game, event);
    } else if (game.league === "EPL") {
      eplSetData(game, event);
    } else if (game.league === "NCAAB") {
      NCAABSetData(game, event);
    }
    if (event.status.type.state == "in") {
      try {
        game.lastPlayImg =
          event.competitions[0].situation.lastPlay.athletesInvolved[0].headshot;
        game.lastPlayText = event.competitions[0].situation.lastPlay.text;
      } catch (error) {}
    } else {
      try {
        game.home.record =
          event.competitions[0].competitors[0].records[0].summary;
        game.away.record =
          event.competitions[0].competitors[1].records[0].summary;
      } catch (error) {}
    }
  }
  if (updatecard) {
    game.updateScoreCard();
  }
}
