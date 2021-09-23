function getHiddenProbability(prevProb){
    const isProbToChange = (Math.random().toFixed(3) <= '0.005') // check if probability to change hidden prob is 0.005

    if(isProbToChange){
        return parseFloat(Math.random().toFixed(3))
    }else{
        return prevProb;
    }
}

module.exports = getHiddenProbability;
