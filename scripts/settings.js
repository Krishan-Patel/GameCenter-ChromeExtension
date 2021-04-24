// handles for submission and updates the user's settings for their new tab page
const submit = document.getElementById("submit");
const nfl = document.getElementById("nfl");
const nba = document.getElementById("nba");
const nhl = document.getElementById("nhl");
const cfl = document.getElementById("cfl");
const epl = document.getElementById("epl");
const mlb = document.getElementById("mlb");
const ncaab = document.getElementById("ncaab");
const url = document.getElementById("background-url");

// handles the submission of the settings form and updates the settings for the user accordingly. 
submit.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log(e);
  let leagues = [];
  //console.log(nfl);
  if (nfl.checked) {
    leagues.push(
      "http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard"
    );
  }
  if (nhl.checked) {
    leagues.push(
      "http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard"
    );
  }
  if (cfl.checked) {
    leagues.push(
      "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard"
    );
  }
  if (nba.checked) {
    leagues.push(
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
    );
  }
  if (mlb.checked) {
    leagues.push(
      "http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard"
    );
  }
  if (ncaab.checked) {
    leagues.push(
      "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard"
    );
  }
  if (epl.checked) {
    leagues.push(
      "http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard"
    );
  }
  if (leagues.length > 0) {
  chrome.storage.sync.set({leagues : leagues});
  chrome.storage.local.clear();
  }

  if (url.value) {
    //console.log(url.value);
    chrome.storage.sync.set({'background' : url.value})
  }
});


// handles the event for when the user wants to reset to the default settings. 
document.getElementById("reset").addEventListener("click", (e) => {
    e.preventDefault(); 
    const leagues = [
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
    "http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
    "http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
    "http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
    "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard",
    "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard",
    "http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",
  ];
    //console.log(leagues)
    chrome.storage.sync.set({leagues : leagues});
    chrome.storage.local.clear(); 
    chrome.storage.sync.set({'background' : "https://images.unsplash.com/photo-1523130979271-d463aac0e7e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"})
});

const upload = document.getElementById('src'); 
const bookmark_url = document.getElementById('target'); 
const add_bookmark = document.getElementById('bookmark')


add_bookmark.addEventListener('click', (e) => { 
  e.preventDefault(); 
  if (bookmark_url.value && upload.value) { 
  let entry = { img: upload.value, 
                url: bookmark_url.value}
  chrome.storage.sync.get('bookmarks', (result) => { 
    let bookmarks = result.bookmarks; 
    bookmarks.push(entry);
    //console.log(bookmarks)
    chrome.storage.sync.set({bookmarks: bookmarks});
    upload.value = null; 
    bookmark_url.value = '';
  })
 
} else { 
  alert('please make sure you have submitted a url and image for the bookmark')
}
})


// https://stackoverflow.com/questions/38809797/putting-an-image-into-chrome-storage-extension
function ImageLoader( url ){
  var imgxhr = new XMLHttpRequest();
      imgxhr.open( "GET", url + "?" + new Date().getTime() );
      imgxhr.responseType = "blob";
      imgxhr.onload = function (){
          if ( imgxhr.status===200 ){
              reader.readAsDataURL(imgxhr.response);
          }
      };
  var reader = new FileReader();
      reader.onloadend = function () {
          document.getElementById( "image" ).src = reader.result;
          chrome.storage.local.set( { Image : reader.result } );
      };
  imgxhr.send();
}

