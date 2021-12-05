import { updateData } from "./Data Functions.js";

// handles the initial setup for when a user installs the extension: opens the options page for them to choose leagues and sets the default background. 
chrome.runtime.onInstalled.addListener(function(object) {
    console.log(object)
    if(object.reason === 'install') {
      chrome.storage.sync.get('background', (result) => {
        if (result.background == undefined) {
          chrome.storage.sync.set({'background' : "https://images.unsplash.com/photo-1523130979271-d463aac0e7e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"});
        } 
      })
      chrome.storage.sync.get('bookmarks', (result) => { 
        if (result.bookmarks == undefined) { 
          chrome.storage.sync.set({bookmarks: []});
        }
      });
      chrome.storage.sync.get('leagues', (result) => {
        if (result.leagues == undefined) {
         chrome.storage.sync.set({leagues : ["https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"]});
        }
      })
      chrome.tabs.create({url:chrome.extension.getURL("../settings.html")}, function (tab) { 			
        console.log("New tab launched with local file"); 		
      });
    }
  });

// creates a chrome alarm event that fires every 30 minutes 
chrome.alarms.create("updateData", {
    when: Date.now() + 60000,
    periodInMinutes: 30,
  });

// listens for the chrome alarm event being fired and responds by updates the cached sports data  
chrome.alarms.onAlarm.addListener(alarm => {
    chrome.storage.local.get('gamesData', function (result) {
        updateData(result.gamesData, false)
    })
})

