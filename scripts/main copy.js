import { dataURLs, loadExisting } from "./Class Definitions.js";
import { fetchInfo, updateData} from "./Data Functions.js";

const gameCards = document.querySelector('.gameCards');
let gamesArray = [];

window.addEventListener('load', () => {
    let data;
    chrome.storage.local.get('gamesData', function (result) {
        data = result.gamesData;
        console.log(data);
        if (data !== undefined && data[0] !== undefined) {
            console.log('using cache')
            data.forEach(league => {
                let leagueArray = [league[0]];
                for (let i = 1; i < league.length; i++) {
                    let card = loadExisting(league[i])
                    card.createCard()
                    gameCards.appendChild(card.container)
                    leagueArray.push(card);
                }
                gamesArray.push(leagueArray)
            })
            console.log(gamesArray)
        } else {
            console.log('manually fetching data')
            let promises = [];
            dataURLs.forEach(url => {
                promises.push(fetchInfo(url));
            })
            Promise.all(promises).then(result => {
                result.forEach(league => {
                    for (let i = 1; i < league.length; i++) {
                        gameCards.append(league[i].container)
                    }
                })
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
    console.log('refreshing')
    id = setTimeout(function liveRefresh() {
        console.log(id);
        updateData(gamesArray,true);
        let date = new Date();
        console.log('scorecard updated ' + date);
        id = setTimeout(liveRefresh, 30000);
        console.log(id);
    }, 7500)
}

window.addEventListener('blur', stopUpdates)

function stopUpdates() {
    console.log('stopped refreshing');
    console.log(id);
    clearTimeout(id);
    window.addEventListener('focus', update)
}

