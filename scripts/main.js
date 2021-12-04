import { loadExisting } from "./Class Definitions.js";
import { fetchInfo, updateData, hideUndefined } from "./Data Functions.js";

const gameCards = document.querySelector(".gameCards");
let gamesArray = [];

// Loads in GameCards from chrome extension storage cache and updates the display with GameCards
//   if cache is unavaliable then fetches data and stores it in cache.
window.addEventListener("load", () => {
  let data;
  chrome.storage.sync.get('background', (url) => { 
    document.body.style.backgroundImage = `url(${url.background})`;
  })
  chrome.storage.local.get("gamesData", function (result) {
    data = result.gamesData;
    if (data !== undefined && data) {
      data.forEach((league) => {
        if (league) {
          let leagueArray = [league[0]];
          for (let i = 1; i < league.length; i++) {
            let card = loadExisting(league[i]);
            card.createCard();
            leagueArray.push(card);
          }
          gamesArray.push(leagueArray);
        } else {
          fetchInfo(league[0]).then((result) => {
            gamesArray.push(result);
          });
        }
      });
      loadCards(gamesArray);
    } else {
      let promises = [];
      let leagues = [];
      chrome.storage.sync.get("leagues", (result) => {
        leagues = result.leagues;
        leagues.forEach((url) => {
          promises.push(fetchInfo(url));
        });
        Promise.all(promises).then((games_result) => {
          loadCards(games_result);
          gamesArray = games_result;
          chrome.storage.local.set({ gamesData: gamesArray });
          chrome.alarms.create("updateData", {
            when: Date.now() + 60000,
            periodInMinutes: 30,
          });
        });
      });
    }
  });
  checkLeagues(gamesArray)
  update();
});
let id;

// update() updates the game information for all relvent scorecards by calling updateData() with gameArray. 
function update() {
  id = setTimeout(function liveRefresh() {
    //console.log(id);
    updateData(gamesArray, true);
    let date = new Date();
    id = setTimeout(liveRefresh, 5000);
  }, 5000);
}
window.addEventListener("blur", stopUpdates);


// stopUpdates() pauses GameCard updates when window is inactive (user clicks away)
function stopUpdates() {
  clearTimeout(id);
  window.addEventListener("focus", update);
}

// loadCards(gamesArray) updates the display with GameCards from gamesArray prioritizing
//   current games and then the nearest games temporally.
function loadCards(gamesArray) {
  let loadArray = gamesArray.flat();
  loadArray = loadArray.filter((a) => !(typeof a === "string"));
  loadArray = loadArray.sort((a, b) => {
    if (a.status === "in" && b.status !== "in") {
      return -1;
    } else if (a.status !== "in" && b.status === "in") {
      return 1;
    } else if (a.status === "in" && b.status === "in") {
      let now = new Date();
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      return Math.abs(now - date2) - Math.abs(now - date1);
    } else {
      let now = new Date();
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      return Math.abs(now - date1) - Math.abs(now - date2);
    }
  });
  loadArray.forEach((game) => {
    gameCards.appendChild(game.container);
  });
  hideUndefined();
}

function checkLeagues(gamesArray) { 
  chrome.storage.sync.get('leagues', (result) => { 
      let leagues = result.leagues; 
      if (gamesArray.length != leagues.length) { 
        chrome.storage.local.clear(); 
        location.reload(); 
      }
      for (i = 0; i < leagues.length; i++) { 
          if (gamesArray[i][0] != leagues[i]) { 
            chrome.storage.local.clear(); 
            location.reload(); 
          }
      }
  })
}