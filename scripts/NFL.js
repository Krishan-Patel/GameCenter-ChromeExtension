
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

