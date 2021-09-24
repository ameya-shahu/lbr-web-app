import axios from 'axios'
import { React, useEffect, useState } from 'react'
import D3Chart from './D3Chart'
import { data } from './Data'
import { useHistory } from "react-router-dom";

function Home() {
    const [pageState, setPageState] = useState({
        cumScore: 0.0,
        cScore: 0.0,
        sliderVal: 50,
        ringColor: 0,
        userId: 0,
        hiddenProb: 0.0,
        lastCompletedRound: 0,
        // diableButton: false,

    })
    const [disable, setDisable] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        // console.log(userInfo);
        localStorage.setItem('startTime', new Date());
        if (data) {
            setPageState({
                sliderVal: data.lastSliderValue,
                cumScore: data.cumlativeScore,
                cScore: data.changedInCumlative,
                ringColor: data.ringColor,
                userId: data.userId,
                hiddenProb: data.hiddenProb,
                lastCompletedRound: data.lastCompletedRound,
                // disableButton: false,
            })
        } else {
            history.push('/') // login page
        }

    }, [history])

    // function will change response according to response from the server
    const handleServerResponse = (response) => {
        if (response.data.completed) {
            localStorage.setItem('user', JSON.stringify(response.data))
            history.push('/thankYou')
        }
        localStorage.setItem('user', JSON.stringify(response.data))

        localStorage.setItem('startTime', new Date());
        console.log(response, 'response');

        setPageState({
            ...pageState,
            sliderVal: response.data.lastSliderValue,
            hiddenProb: response.data.hiddenProb,
            cumScore: response.data.cumlativeScore,
            cScore: response.data.changedInCumlative,
            ringColor: response.data.ringColor,
            lastCompletedRound: response.data.lastCompletedRound,
        })

        setDisable(false)
    }

    const handleServerError = (error) => {
        localStorage.removeItem('user')
        localStorage.removeItem('startTime')

        alert('Technical issue, redirecting to login page. ' + error)
        console.log(error)

        history.push('/')
    }

    const sendToServer = (roundData) => {
        axios.post('/api/data/senddata', roundData)
            .then(response => handleServerResponse(response))
            .catch(error => handleServerError(error))
    }

    const handleClick = (e) => {
        var screenTime = (new Date - new Date(localStorage.getItem('startTime'))) / 1000;
        console.log(screenTime);



        var roundData = {
            userId: pageState.userId,
            roundNo: pageState.lastCompletedRound + 1,
            screenTime: screenTime,
            sliderValue: pageState.sliderVal,
            hiddenProb: pageState.hiddenProb,
            ringColor: pageState.ringColor,
            CumlativeScore: pageState.cumScore
        }
        console.log(roundData);
        setDisable(true)
        sendToServer(roundData);
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
            {/* <div className='row justify-content-center' style={{ backgroundColor: '#232323' }}> */}
            {/* <div className='col col-md-6 text-center mt-2'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Cumulative Score" disabled>
                        Cumulative Score: {pageState.cumScore}
                    </button>
                </div> */}
            {/* <div className='col col-md-4 text-center'>
                    <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Round">
                        Round: 501
                    </button>
                </div> */}
            {/* <div className='col col-md-6 text-center mt-2'>
                    <button
                        type="button"
                        className="btn btn-secondary fs-3"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Change in score"
                        onClick={(e) => handleClick(e)}
                        disabled
                    >
                        Change in score: {pageState.cScore}
                    </button>
                </div> */}
            {/* </div> */}

            {/* row -> Box, Ring & Next */}
            <div className='row mt-4'>
                <div className='col mb-1'>
                    <div className='row justify-content-center'>
                        <div className='col'>
                            {/* <div className='col col-xs-2'> */}
                            <div className='card text-center' style={{ width: '150px' }}>
                                <div className='card-body mt-4 mb-4 fs-2 fw-bold '>
                                    बॉक्स
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                        <div className='col mt-0  text-center fw-bold' style={{ fontSize: '66px', color: pageState.ringColor == 0 ? '#66FF00' : 'red' }}>
                            0
                        </div>
                    </div>
                </div>

                {/* row -> slider */}
                <div className='row mt-3 mb-5'>
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
                                disabled={disable}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col text-start h4' style={{ color: '#66FF00' }}>
                            0%
                        </div>
                        <div className='col text-center'>
                            <button type="button" className="btn btn-secondary fs-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Slider Score">
                                {pageState.sliderVal}
                            </button>
                        </div>
                        <div className='col text-end h4' style={{ color: '#66FF00' }}>
                            100%
                        </div>
                    </div>
                    <div className='row mt-5 text-end'>
                        <div className='col'>
                            <button
                                className="btn btn-primary btn-lg fs-1 fw-bold"
                                variant='contained'
                                onClick={(e) => handleClick(e)}
                                disabled={disable}
                            >
                                Next
                            </button>
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
