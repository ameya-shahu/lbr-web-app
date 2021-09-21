import { Box, Button, Input, Slider } from '@material-ui/core'
import axios from 'axios'
import { React, useEffect, useState } from 'react'
import D3Chart from './D3Chart'
import { data } from './Data'

function Home() {
    const [sliderVal, setSliderVal] = useState(50)

    useEffect(() => {
        localStorage.setItem('startTime', new Date());
        //console.log('use effect');
    }, [])

    // function will change response according to response from the server
    const handleServerResponse = (response) => {
        localStorage.setItem('startTime', new Date());
        console.log(response);
    }

    const handleServerError = (error) => {

    }

    const sendToServer = (roundData) => {
        axios.post('/senddata', roundData)
            .then(response => handleServerResponse(response))
            .catch(error => handleServerError(error))
    }


    const handleClick = (e) => {
        var screenTime = (new Date - new Date(localStorage.getItem('startTime'))) / 1000;
        console.log(screenTime);
        sendToServer({
            userId: 23,
            roundNo: 23,
            screenTime: screenTime,
            sliderValue: sliderVal
        });
    }
    return (

        <div className='container'>
            {/* row 1 -> slider */}
            <div className='row mt-4 mb-2'>
                <div className='col col-10 mt-1'>
                    <input
                        className='form-range'
                        type="range"
                        name="slider"
                        id="slider"
                        value={sliderVal}
                        min="0"
                        max="100"
                        step="0.1"
                        onChange={(e) => setSliderVal(e.target.value)}
                    />
                </div>
                <div className='col'>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Slider Score">
                        {sliderVal}
                    </button>
                </div>
            </div>

            {/* row 2 -> Next & chart */}
            <div className='row mt-5'>
                <div className='col mb-3'>
                    <div className='row'>
                        <div className='col col-md'>
                            <div className='card text-center'>
                                <div className='card-body mt-4 mb-4 fs-2 fw-bold'>
                                    Box of Rings
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col'>
                            <button
                                className="btn btn-secondary btn-lg fs-3"
                                variant='contained'
                                onClick={(e) => handleClick(e)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card' style={{width: '30rem'}}>
                            <D3Chart
                                sliderVal={sliderVal}
                                redData={data.slice(0, (sliderVal) * 10)}
                                greenData={data.slice((sliderVal) * 10, 1000)}
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
