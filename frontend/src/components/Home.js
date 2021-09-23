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
        <div className='container p-3'>
            {/* row -> scores & round */}
            <div className='row justify-content-center' style={{ backgroundColor: '#232323' }}>
                <div className='col col-md-6 text-center mt-2'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Cumulative Score" disabled>
                        Cumulative Score: 1.22
                    </button>
                </div>
                {/* <div className='col col-md-4 text-center'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Round">
                        Round: 501
                    </button>
                </div> */}
                <div className='col col-md-6 text-center mt-2'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Change in score" disabled>
                        Change in score: XX
                    </button>
                </div>
            </div>

            {/* row -> Box, Ring & Next */}
            <div className='row mt-4'>
                <div className='col mb-1'>
                    <div className='row'>
                        <div className='col col-md-2'>
                            {/* <div className='col col-xs-2'> */}
                                <div className='card text-center'>
                                    <div className='card-body mt-4 mb-4 fs-2 fw-bold'>
                                        Box of Rings
                                    </div>
                                </div>
                            {/* </div> */}
                        </div>
                        <div className='col col-md-6 mt-0  text-center text-success fw-bold' style={{ fontSize: '66px'}}>
                            0
                        </div>
                        <div className='col col-md mt-4 text-center'>
                            <button
                                className="btn btn-primary btn-lg fs-3"
                                variant='contained'
                                onClick={(e) => handleClick(e)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* row -> slider */}
                <div className='row mt-3 mb-2'>
                    <div className='row'>
                        <div className='col mt-1'>
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
                    </div>
                    <div className='row'>
                        <div className='col text-start text-success h4'>
                            0%
                        </div>
                        <div className='col text-center'>
                            <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Slider Score">
                                {sliderVal}
                            </button>
                        </div>
                        <div className='col text-end text-success h4'>
                            100%
                        </div>
                    </div>
                </div>

                {/* row -> chart */}
                <div className='row mt-3'>
                    <div className='col d-flex justify-content-center'>
                        <div className='card' style={{ width: '30rem', border: '0px' }}>
                            <D3Chart
                                sliderVal={sliderVal}
                                redData={data.slice(0, (sliderVal) * 10)}
                                greenData={data.slice((sliderVal) * 10, 1000)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
