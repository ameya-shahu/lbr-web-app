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
    cumlativeScore:{
        type: Number,
        required: [true,'cumlativeScore is not provided'],
    }
});


const RoundwiseData = mongoose.model("RoundwiseData",RoundwiseDataSchema);

module.exports = RoundwiseData;