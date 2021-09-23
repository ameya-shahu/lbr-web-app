function getDisplayRingColor(hiddenProbability){
    const isProbToChange = (parseFloat(Math.random().toFixed(3)) <= hiddenProbability) // check if probability to get green is given as hidden probability

    if(isProbToChange){
        return(1); // 1 for green color
    }else{
        return (0); // 0 stand for red color
    }
}

module.exports = getDisplayRingColor;
