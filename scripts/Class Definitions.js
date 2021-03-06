// scoreCard class defines a class based template for all gamecard objects containing all the important information about each game 
//   displayed to the user including the score, status, leaders etc. 
export class scoreCard {
    constructor(homeName, homeLogo, homeRecord, homeScore, awayName, awayLogo, awayRecord, awayScore, gameId, detail, status, link, date) {
        this.home = new Team(homeName, homeLogo, homeRecord, homeScore, null);
        this.away = new Team(awayName, awayLogo, awayRecord, awayScore, null);
        this.gameId = gameId;
        this.status = status;
        this.details = detail;
        this.gameLeaders = {};
        this.link = link;
        this.date = date; 
    }

    // updateScoreCard() updates the UI with updated game information to always desplay the most current data.
    updateScoreCard = () => {
        this.score.textContent = `${this.home.score} - ${this.away.score}`;
        this.gamedetail.textContent = this.details;
        this.home.updateLinescore(this.homeRow, this.header);
        this.away.updateLinescore(this.awayRow, this.header);
        this.oddsText.textContent = `${this.odds} OVR/UNDER: ${this.overUnder}`


        if ((this.league === 'NFL' || this.league === 'CFL') && (this.status == 'post' || this.status === 'in')) {
            try {
                this.passingLeader.setAttribute('src', this.gameLeaders.passLeaderImg);
                this.passStats.textContent = this.gameLeaders.passLeaderTxt;
                this.rushingLeader.setAttribute('src', this.gameLeaders.rushingLeaderImg);
                this.rushStats.textContent = this.gameLeaders.rushingLeaderTxt;
                this.recievingLeader.setAttribute('src', this.gameLeaders.recievingLeaderImg);
                this.recievingStats.textContent = this.gameLeaders.recieveingLeaderTxt;
            } catch { 
                this.passingLeader.setAttribute('src',null);
                this.rushingLeader.setAttribute('src',null);
                this.recievingLeader.setAttribute('src',null);
            }
            try {
                this.headlineText.textContent = this.headline
                this.lastPlayP.textContent = this.lastPlayText;
                this.lastPlayImage.src = this.lastPlayImg;    
            } catch (error) {
                this.lastPlayImage.src = null; 
            }
        }
        else if (this.status === 'in' || this.status === 'post'){
            try {
                this.homeLeaderImg.src = this.home.leadersImg;
                this.homeLeaderStats.textContent = this.home.leadersStats;
                this.awayLeaderImg.src = this.away.leadersImg;
                this.awayLeaderStats.textContent = this.away.leadersStats;
            } catch { 
                this.homeLeaderImg.src = null; 
                this.awayLeaderImg.src = null; 
            }
            try {
                this.lastPlayP.textContent = this.lastPlayText;
                this.lastPlayImage.src = this.lastPlayImg;
                this.headlineText.textContent = this.headline
            } catch (error) {
                this.lastPlayImage.src = null;
             }
        }


    }

    // flip() Changes the UI by swapping the display for a particular gamecard to the backpage when a user clicks on it. 
    flip = () => {
        if (this.backpage.style.display === 'none') {
            this.scoreCard.style.display = 'none';
            this.backpage.style.display = 'flex';
        } else {
            this.backpage.style.display = 'none';
            this.scoreCard.style.display = 'flex';
        }
    }

    // createCard() uses the DOM api to create the scorecard and all the necessary components to display 
    //   the game information on the UI and applies any necessary styles. 
    createCard() {
        this.scoreCard = document.createElement('div');
        this.scoreCard.setAttribute('class', 'scorecard');
        const team1Div = this.home.construcutTeamDiv();
        const team2Div = this.away.construcutTeamDiv();
        let center = document.createElement('div');
        center.setAttribute('class', 'center');
        this.score = document.createElement('p');
        this.score.setAttribute('class', 'score');
        this.score.textContent = `${this.home.score}-${this.away.score}`;
        this.gamedetail = document.createElement('p');
        this.gamedetail.textContent = this.details;
        const atag = document.createElement('a');
        atag.setAttribute('href', this.link);
        atag.appendChild(this.gamedetail);
        center.appendChild(this.score);
        center.appendChild(atag);
        this.scoreCard.appendChild(team1Div);
        this.scoreCard.appendChild(center);
        this.scoreCard.appendChild(team2Div);

        this.backpage = document.createElement('div');
        this.backpage.setAttribute('class', 'backpage');

        const top = document.createElement('div')
        top.setAttribute('class', 'top');
        const headline = document.createElement('div')
        headline.setAttribute('class', 'headline');
        this.headlineText = document.createElement('p');
        this.headlineText.textContent = this.headline;
        const oddsContainer = document.createElement('div')
        oddsContainer.setAttribute('class', 'odds');
        this.oddsText = document.createElement('p');
        this.oddsText.textContent = `${this.odds} OVR/UNDER: ${this.overUnder}`
        oddsContainer.appendChild(this.oddsText);
        headline.appendChild(this.headlineText)
        top.appendChild(headline)
        top.appendChild(oddsContainer)


        const middle = document.createElement('div')
        middle.setAttribute('class', 'middle');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        this.header = document.createElement('tr');
        this.header.insertCell(-1);
        this.header.insertCell();
        this.header.insertCell();
        this.header.insertCell();
        this.header.cells[1].textContent = 1;
        this.header.cells[2].textContent = 2;
        this.header.cells[3].textContent = 3;
        thead.appendChild(this.header);
        const tbody = document.createElement('tbody');
        this.awayRow = document.createElement('tr');
        this.homeRow = document.createElement('tr');
        const tableHomeLogo = document.createElement('td')
        const homePic = document.createElement('img')
        homePic.setAttribute('src', this.home.logo);
        tableHomeLogo.appendChild(homePic)
        const tableAwayLogo = document.createElement('td')
        const awayPic = document.createElement('img')
        awayPic.setAttribute('src', this.away.logo);
        tableAwayLogo.appendChild(awayPic)
        this.homeRow.appendChild(tableHomeLogo);
        this.awayRow.appendChild(tableAwayLogo);
        tbody.appendChild(this.homeRow);
        tbody.appendChild(this.awayRow);
        table.appendChild(thead);
        table.appendChild(tbody);
        const lastPlayContainer = document.createElement('div');
        lastPlayContainer.setAttribute('class', 'lastPlay');
        this.lastPlayImage = document.createElement('img');
        this.lastPlayImage.setAttribute('src', '/');
        this.lastPlayP = document.createElement('p');
        lastPlayContainer.appendChild(this.lastPlayImage);
        lastPlayContainer.appendChild(this.lastPlayP);
        middle.appendChild(table);
        middle.appendChild(lastPlayContainer)
        const gameLeaders = document.createElement('div');

        if (this.league === "NFL" || this.league === 'CFL') {
            gameLeaders.setAttribute('class', 'gameLeaders');
            this.passingLeader = document.createElement('img');
            this.passingLeader.setAttribute('src', this.gameLeaders.passLeaderImg);
            this.passStats = document.createElement('p')
            this.passStats.textContent = this.gameLeaders.passLeaderTxt;
            this.rushingLeader = document.createElement('img');
            this.rushingLeader.setAttribute('src', this.gameLeaders.rushingLeaderImg);
            this.rushStats = document.createElement('p');
            this.rushStats.textContent = this.gameLeaders.rushingLeaderTxt;
            this.recievingLeader = document.createElement('img');
            this.recievingLeader.setAttribute('src', this.gameLeaders.recievingLeaderImg ? this.gameLeaders.recievingLeaderImg : '/' );
            this.recievingStats = document.createElement('p');
            this.recievingStats.textContent = this.gameLeaders.recieveingLeaderTxt;
            gameLeaders.appendChild(this.passingLeader);
            gameLeaders.appendChild(this.passStats);
            gameLeaders.appendChild(this.rushingLeader);
            gameLeaders.appendChild(this.rushStats);
            gameLeaders.appendChild(this.recievingLeader);
            gameLeaders.appendChild(this.recievingStats);
        } else {
            gameLeaders.setAttribute('class', 'leadersDiv');
            const homeLeader = document.createElement('div');
            homeLeader.setAttribute('class', 'leader');
            const awayLeader = document.createElement('div');
            awayLeader.setAttribute('class', 'leader');
            this.homeLeaderImg = document.createElement('img');
            this.homeLeaderStats = document.createElement('p');
            this.awayLeaderImg = document.createElement('img');
            this.awayLeaderStats = document.createElement('p');
            this.homeLeaderName = document.createElement('p');
            this.awayLeaderName = document.createElement('p');
            try {
            this.homeLeaderImg.setAttribute('src', this.home.leadersImg);
            this.awayLeaderImg.setAttribute('src', this.away.leadersImg);
            } catch {
            this.homeLeaderImg.src = null; 
            this.awayLeaderImg.src = null; 
            }
            this.awayLeaderStats.textContent = this.away.leadersStats;
            this.homeLeaderStats.textContent = this.home.leadersStats;
            this.homeLeaderName.textContent = this.home.leadersName; 
            this.awayLeaderName.textContent = this.away.leadersName;
            homeLeader.appendChild(this.homeLeaderImg);
            homeLeader.appendChild(this.homeLeaderName);
            homeLeader.appendChild(this.homeLeaderStats);
            awayLeader.appendChild(this.awayLeaderImg);
            awayLeader.appendChild(this.awayLeaderName);
            awayLeader.appendChild(this.awayLeaderStats);
            gameLeaders.appendChild(homeLeader);
            gameLeaders.appendChild(awayLeader);

        }
        this.backpage.append(top);
        this.backpage.append(middle);
        this.backpage.appendChild(gameLeaders);
        this.container = document.createElement('div');
        this.container.appendChild(this.scoreCard)
        this.container.appendChild(this.backpage)
        this.backpage.style.display = 'none';
        this.container.addEventListener('click', this.flip)
        this.home.updateLinescore(this.homeRow, this.header);
        this.away.updateLinescore(this.awayRow, this.header);
    }
}

// Team class creates a template for team objects that store team specific data inside the ScoreCard Class 
//   team objects contain a teams: name, logo, record, score, linescore and leaders. 
class Team {
    constructor(name, logo, record, score, linescore) {
        this.name = name;
        this.logo = logo;
        this.record = record;
        this.score = score;
        this.linescore = linescore;

    }

    // constructTeamDiv() uses the DOM api to create the team component of the scorecard UI. 
    construcutTeamDiv() {
        const teamDiv = document.createElement('div');
        teamDiv.setAttribute('class', 'team');
        const logo = document.createElement('img');
        logo.setAttribute('src', this.logo)
        const name = document.createElement('p');
        name.textContent = this.name
        const record = document.createElement('p');
        if (this.record) {
            record.textContent = `(${this.record})`;
        }
        teamDiv.appendChild(logo);
        teamDiv.appendChild(name);
        teamDiv.appendChild(record);
        return teamDiv;
    }

    // updateLinescore(tableRow, tableHeader) updates the linescore for TableHeader by adding or changing the value in tableRow
    updateLinescore(tableRow, TableHeader) {
        if (!this.linescore) {
            return;
        }
        for (let i = 0; i < this.linescore.length; i++) {
            if (tableRow.cells[i + 1]) {
                tableRow.cells[i + 1].innerHTML = this.linescore[i].value
            } else {
                if (TableHeader.cells.length - 2 < i) {
                    const td = document.createElement('td');
                    td.innerHTML = i + 1;
                    TableHeader.appendChild(td);

                }
                tableRow.insertCell(-1);
                tableRow.cells[i + 1].innerHTML = this.linescore[i].value;
            }
        }
    }
}


// loadExisting(scorecard) uses scorecard to create a scorecard object and initializes any necessary 
//   fields of the object needed for UI. 
// Note: When the scorecard information is cached inside the Chrome Storage API the methods aren't stored so 
//       the scorecard is recreated each time the information is loaded in from the cache. 
export function loadExisting(scorecard) {
    let card = new scoreCard(scorecard.home.name,
        scorecard.home.logo,
        scorecard.home.record,
        scorecard.home.score,
        scorecard.away.name,
        scorecard.away.logo,
        scorecard.away.record,
        scorecard.away.score,
        scorecard.gameId,
        scorecard.details,
        scorecard.status,
        scorecard.link, 
        scorecard.date)
    card.home.leadersImg = scorecard.home.leadersImg;
    card.home.leadersStats = scorecard.home.leadersStats;
    card.home.leadersName = scorecard.home.leadersName;
    card.home.linescore = scorecard.home.linescore;
    card.away.leadersImg = scorecard.away.leadersImg;
    card.away.leadersStats = scorecard.away.leadersStats;
    card.away.leadersName = scorecard.away.leadersName;
    card.away.linescore = scorecard.away.linescore;
    card.gameLeaders = scorecard.gameLeaders;
    card.odds = scorecard.odds;
    card.overUnder = scorecard.overUnder;
    card.league = scorecard.league;
    card.headline = scorecard.headline;
    return card;
}