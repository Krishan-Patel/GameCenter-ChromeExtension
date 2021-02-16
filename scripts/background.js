import { updateData } from "./Data Functions.js";


chrome.runtime.onInstalled.addListener(function() {
    chrome.runtime.openOptionsPage(() => {
        console.log('opened page')
    })
    chrome.storage.sync.set({'background' : "https://images.unsplash.com/photo-1523130979271-d463aac0e7e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"});
  });

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

