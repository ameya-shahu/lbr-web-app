const mongoose = require('mongoose');

const RoundwiseDataSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:[true,"user id is missing"],
    },
    roundNo:{
        type: Number,
        required:[true, "round number is missing"],
    },
    screenTime:{
        type: Number,
        required: [true,"screentime is missing"]
    },
    sliderValue:{
        type: Number,
        required: [true, 'slider value is missing']
    },
    currHiddenProb:{
        type: Number,
        required: [true, 'Hidden probability is missing']
    },
    currRingColor:{
        type: Number,
        required: [true, 'ring color is not mentioned']
    },
    nextHiddenProb:{
        type: Number,
        required: [true, 'next Hidden probability is missing']
    },
    nextRingColor:{
        type: Number,
        required: [true, 'ring color is not mentioned']
    },
    cumlativeScore:{
        type: Number,
        required: [true,'cumlativeScore is not provided'],
    },
    changedInScore:{
        type: Number,
        required: [true, 'ChnagedInCumlative field is missing']
    },

});


const RoundwiseData = mongoose.model("RoundwiseData",RoundwiseDataSchema);

module.exports = RoundwiseData;