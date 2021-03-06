// function for setting specific information within a NBA scorecard object. 
export function nbaSetData(card, event) {
    try {
        card.home.leadersImg =   event.competitions[0].competitors[0].leaders[3].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[3].leaders[0].displayValue;
        card.home.leadersName = event.competitions[0].competitors[0].leaders[3].leaders[0].athlete.displayName;
        card.away.leadersImg =   event.competitions[0].competitors[1].leaders[3].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[3].leaders[0].displayValue;
        card.away.leadersName = event.competitions[0].competitors[1].leaders[3].leaders[0].athlete.displayName;
        try {
            card.headline = event.competitions[0].headlines[0].shortLinkText;
        } catch {
            card.headline = event.name; 
         }
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
        card.gameLeaders.passLeaderName = event.competitions[0].leaders[0].leaders[0].athlete.displayName;
        card.gameLeaders.rushingLeaderImg = event.competitions[0].leaders[1].leaders[0].athlete.headshot;
        card.gameLeaders.rushingLeaderTxt = event.competitions[0].leaders[1].leaders[0].displayValue;
        card.gameLeaders.rushingLeaderName = event.competitions[0].leaders[1].leaders[0].athlete.displayName;
        card.gameLeaders.recievingLeaderImg = event.competitions[0].leaders[2].leaders[0].athlete.headshot;
        card.gameLeaders.recieveingLeaderTxt = event.competitions[0].leaders[2].leaders[0].displayValue;
        card.gameLeaders.recieveingLeaderName = event.competitions[0].leaders[2].leaders[0].athlete.displayName;
    }catch (error) {console.log(error)}

        try {
            card.headline = event.competitions[0].situation.downDistanceText;
        } catch (error) {
            card.headline = event.name; 
         }
         try {
             card.headline = event.competitions[0].notes[0].headline;
         } catch {
            card.headline = event.name; 
         }
    }


// function for setting specific information within a NHL scorecard object. 
export function nhlSetData(card, event) {
    try{
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[2].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[2].leaders[0].displayValue;
        card.home.leadersName = event.competitions[0].competitors[0].leaders[2].leaders[0].athlete.displayName;
    } catch { }
    try {
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[2].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[2].leaders[0].displayValue;
        card.away.leadersName = event.competitions[0].competitors[1].leaders[2].leaders[0].athlete.displayName;
    } catch { }
    try {
        card.headline = event.competitions[0].headlines[0].shortLinkText;
    } catch (error) { 
        card.headline = event.name; 
     }

}

// function for setting specific information within a MLB scorecard object. 
export function mlbSetData(card, event) {
    try {
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[4].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[4].leaders[0].displayValue;
        card.home.leadersName = event.competitions[0].competitors[0].leaders[4].leaders[0].athlete.displayName;
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[4].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[4].leaders[0].displayValue;
        card.away.leadersName = event.competitions[0].competitors[1].leaders[4].leaders[0].athlete.displayName;
    } catch (error) { 
        console.log(error) }
}

// function for setting specific information within a College Basketball scorecard object. 
export function NCAABSetData(card, event) {
    try {
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[0].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[0].leaders[0].displayValue;
        card.home.leadersName = event.competitions[0].competitors[0].leaders[0].leaders[0].athlete.displayName;
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[0].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[0].leaders[0].displayValue;
        card.away.leadersName = event.competitions[0].competitors[1].leaders[0].leaders[0].athlete.displayName;
    } catch (error) { console.log(error) }
    try {
        card.headline = event.competitions[0].headlines[0].shortLinkText;
    } catch (error) { 
        card.headline = event.name; 
        console.log(error) 
    }

}

// function for setting specific information within a Premier League scorecard object. 
export function eplSetData(card, event) {
    try { 
    card.home.leadersStats = event.competitions[0].competitors[0].leaders[0].leaders[0].shortDisplayValue;
    card.home.leadersName = event.competitions[0].competitors[0].leaders[0].leaders[0].athlete.displayName;
    card.away.leadersStats = event.competitions[0].competitors[1].leaders[0].leaders[0].shortDisplayValue;
    card.away.leadersName = event.competitions[0].competitors[1].leaders[0].leaders[0].athlete.displayName;
    }catch{}
    try { 
        card.headline = event.competitions[0].headlines[0].shortLinkText;
    }catch{ 
        card.headline = event.name; 
    }
}


