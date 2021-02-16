// function for setting specific information within a NBA scorecard object. 
export function nbaSetData(card, event) {
    try {
        card.home.leadersImg =   event.competitions[0].competitors[0].leaders[3].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[3].leaders[0].displayValue;
        card.away.leadersImg =   event.competitions[0].competitors[1].leaders[3].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[3].leaders[0].displayValue;
        try {
            card.headline = event.competitions[0].notes[0].headline;
        } catch { }
    } catch (error) {
        console.log(error)
        console.log(card.home.name)
    }
}

// function for setting specific information within a NFL and college Footbal scorecard object. 
export function nflSetData(card, event) {
    try {
        card.gameLeaders.passLeaderImg = event.competitions[0].leaders[0].leaders[0].athlete.headshot;
        card.gameLeaders.passLeaderTxt = event.competitions[0].leaders[0].leaders[0].displayValue;
        card.gameLeaders.rushingLeaderImg = event.competitions[0].leaders[1].leaders[0].athlete.headshot;
        card.gameLeaders.rushingLeaderTxt = event.competitions[0].leaders[1].leaders[0].displayValue;
        card.gameLeaders.recievingLeaderImg = event.competitions[0].leaders[2].leaders[0].athlete.headshot;
        card.gameLeaders.recieveingLeaderTxt = event.competitions[0].leaders[2].leaders[0].displayValue;
    }catch (error) {console.log(error)}

        try {
            card.headline = event.competitions[0].situation.downDistanceText;
        } catch (error) {
            card.headline = event.competitions[0].notes[0].headline;
         }
    }


// function for setting specific information within a NHL scorecard object. 
export function nhlSetData(card, event) {
    try{
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[2].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[2].leaders[0].displayValue;
    } catch { }
    try {
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[2].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[2].leaders[0].displayValue;
    } catch { }
    try {
        card.headline = event.competitions[0].headlines[0].shortLinkText;
    } catch (error) { console.log(error) }

}

// function for setting specific information within a MLB scorecard object. 
export function mlbSetData(card, event) {
    try {
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[4].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[4].leaders[0].displayValue;
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[4].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[4].leaders[0].displayValue;
    } catch (error) { console.log(error) }
}

// function for setting specific information within a College Basketball scorecard object. 
export function NCAABSetData(card, event) {
    try {
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[0].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[0].leaders[0].displayValue;
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[0].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[0].leaders[0].displayValue;
    } catch (error) { console.log(error) }
}

// function for setting specific information within a Premier League scorecard object. 
export function eplSetData(card, event) {
    try { 
    card.home.leadersStats = event.competitions[0].competitors[0].leaders[0].leaders[0].shortDisplayValue;
    card.away.leadersStats = event.competitions[0].competitors[1].leaders[0].leaders[0].shortDisplayValue;
    }catch{}
    try { 
        card.headline = event.competitions[0].headlines[0].shortLinkText;
    }catch{}
}


