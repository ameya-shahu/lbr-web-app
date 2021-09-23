import axios from 'axios'
import { React, useEffect, useState } from 'react'
import D3Chart from './D3Chart'
import { data } from './Data'

function Home() {
    const [pageState, setPageState] = useState({
        cumScore: 0.0,
        cScore: 0.0,
        sliderVal: 50,
        ringColor: 'green'
    })




    useEffect(() => {
        localStorage.setItem('startTime', new Date());
        const data = JSON.parse(localStorage.getItem('user'))
        // console.log(userInfo);
        setPageState({
            sliderVal: data.lastSliderValue,
            cumScore: data.cumlativeScore,
            cScore: data.changedInCumlative,
            ringColor: 'green'
        })
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
            sliderValue: pageState.sliderVal
        });
    }

    const handleSlider = (e) => {
        setPageState({
            ...pageState,
            sliderVal: e.target.value
        })
    }
    return (
        <div className='container p-3'>
            {/* row -> scores & round */}
            <div className='row justify-content-center' style={{ backgroundColor: '#232323' }}>
                <div className='col col-md-6 text-center mt-2'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Cumulative Score" disabled>
                        Cumulative Score: {pageState.cumScore}
                    </button>
                </div>
                {/* <div className='col col-md-4 text-center'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Round">
                        Round: 501
                    </button>
                </div> */}
                <div className='col col-md-6 text-center mt-2'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Change in score" disabled>
                        Change in score: {pageState.cScore}
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
                        <div className='col col-md-6 mt-0  text-center fw-bold' style={{ fontSize: '66px', color: pageState.ringColor}}>
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
                                value={pageState.sliderVal}
                                min="0"
                                max="100"
                                step="0.1"
                                onChange={(e) => handleSlider(e)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col text-start text-success h4'>
                            0%
                        </div>
                        <div className='col text-center'>
                            <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Slider Score">
                                {pageState.sliderVal}
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
                                sliderVal={pageState.sliderVal}
                                redData={data.slice(0, (pageState.sliderVal) * 10)}
                                greenData={data.slice((pageState.sliderVal) * 10, 1000)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
