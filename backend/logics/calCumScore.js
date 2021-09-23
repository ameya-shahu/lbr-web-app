function getChangeInScore(sliderValue, ringColorCode){
    /* ring color code will be 1 -- green, 0 -- red */
    let interVal = ringColorCode - sliderValue;
    let changedInScore = (1-(interVal * interVal));
    return parseFloat(changedInScore.toFixed(3)); 
}

module.exports = getChangeInScore;
