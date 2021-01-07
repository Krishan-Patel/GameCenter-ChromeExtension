import { dataURLs, loadExisting } from "./Class Definitions.js";
import { fetchInfo, updateData } from "./Data Functions.js";

const gameCards = document.querySelector(".gameCards");
let gamesArray = [];

window.addEventListener('load', () => {
  let data;
  chrome.storage.local.get('gamesData', function (result) {
      data = result.gamesData;
      console.log(data);
      if (data !== undefined) {
          console.log('using cache')
          data.forEach(league => {
             if (league){ 
              let leagueArray = [league[0]];
              for (let i = 1; i < league.length; i++) {
                   let card = loadExisting(league[i])
                   card.createCard()
                   leagueArray.push(card);
              }
               gamesArray.push(leagueArray)
             }
          })
          console.log(gamesArray)
          loadCards(gamesArray)
      } else {
          console.log('manually fetching data')
          let promises = [];
          dataURLs.forEach(url => {
              promises.push(fetchInfo(url));
          })
          Promise.all(promises).then(result => {
              loadCards(result)
              console.log(result)
              gamesArray = result
              chrome.storage.local.set({ 'gamesData': gamesArray })
              chrome.alarms.create('updateData', {
                  "when": (Date.now() + 60000),
                  "periodInMinutes": 60
              })
          })
      }
  })
  update();
})

let id;

function update() {
  console.log("refreshing");
  id = setTimeout(function liveRefresh() {
    console.log(id);
    updateData(gamesArray, true);
    let date = new Date();
    console.log("scorecard updated " + date);
    id = setTimeout(liveRefresh, 30000);
    console.log(id);
  }, 7500);
}

window.addEventListener("blur", stopUpdates);

function stopUpdates() {
  console.log("stopped refreshing");
  console.log(id);
  clearTimeout(id);
  window.addEventListener("focus", update);
}

function loadCards(gamesArray) {
  let loadArray = gamesArray.flat();
  loadArray = loadArray.filter((a) => !(typeof a === "string"));
  loadArray = loadArray.sort((a, b) => {
    
    if (a.status === 'in' && b.status !== 'in'){ 
      return -1
    }else if (a.status !== 'in' && b.status === 'in'){
      return 1
    }else if (a.status === 'in' && b.status === 'in') {
      let now = new Date();
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      return Math.abs(now - date2) - Math.abs(now - date1)
    }
    else{
    let now = new Date();
    let date1 = new Date(a.date);
    let date2 = new Date(b.date);
    return Math.abs(now - date1) - Math.abs(now - date2)
    }
  });
  console.log(loadArray);
  loadArray.forEach((game) => {
    gameCards.appendChild(game.container);
  });
}
