
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
        } catch (error) { }
    }



export function nhlSetData(card, event) {
    try {
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

export function mlbSetData(card, event) {
    try {
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[4].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[4].leaders[0].displayValue;
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[4].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[4].leaders[0].displayValue;
    } catch (error) { console.log(error) }
}

export function NCAABSetData(card, event) {
    try {
        card.home.leadersImg = event.competitions[0].competitors[0].leaders[0].leaders[0].athlete.headshot;
        card.home.leadersStats = event.competitions[0].competitors[0].leaders[0].leaders[0].displayValue;
        card.away.leadersImg = event.competitions[0].competitors[1].leaders[0].leaders[0].athlete.headshot;
        card.away.leadersStats = event.competitions[0].competitors[1].leaders[0].leaders[0].displayValue;
    } catch (error) { console.log(error) }
}

export function eplSetData(card, event) {
    //card.home.leadersImg = event.competitions[0].competitors[0].leaders[0].leaders[0].athlete.headshot;
    card.home.leadersStats = event.competitions[0].competitors[0].leaders[0].leaders[0].shortDisplayValue;
    //card.away.leadersImg = event.competitions[0].competitors[1].leaders[0].leaders[0].athlete.headshot;
    card.away.leadersStats = event.competitions[0].competitors[1].leaders[0].leaders[0].shortDisplayValue;
    event.competitions[0].headlines[0].shortLinkText;
}


