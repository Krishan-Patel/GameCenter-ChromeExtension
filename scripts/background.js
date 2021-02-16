import { updateData } from "./Data Functions.js";

chrome.alarms.create("updateData", {
    when: Date.now() + 60000,
    periodInMinutes: 30,
  });

chrome.alarms.onAlarm.addListener(alarm => {
    chrome.storage.local.get('gamesData', function (result) {
        updateData(result.gamesData, false)
    })
    var date = Date();
    console.log('information sucesffully updated ' + date)
})

