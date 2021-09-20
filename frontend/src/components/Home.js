import { Box, Button, Input, Slider } from '@material-ui/core'
import axios from 'axios'
import { React, useEffect, useState } from 'react'
import D3Chart from './D3Chart'
import { data } from './Data'

function Home() {
    const [sliderVal, setSliderVal] = useState(50)

    useEffect(()=>{
        localStorage.setItem('startTime', new Date());
        //console.log('use effect');
    }, [])

    // function will change response according to response from the server
    const handleServerResponse = (response)=>{
        localStorage.setItem('startTime', new Date());
        console.log(response);
    }

    const handleServerError = (error) =>{

    }

    const sendToServer = (roundData) =>{
        axios.post('/senddata', roundData)
        .then(response => handleServerResponse(response))
        .catch(error => handleServerError(error))
    }


    const handleClick = (e) => {
        var screenTime = (new Date - new Date(localStorage.getItem('startTime')) )/1000;
        console.log(screenTime); 
        sendToServer({
            userId:23,
            roundNo: 23,
            screenTime: screenTime,
            sliderValue:sliderVal
        });
    }
    return (

        <div>
            <p>{sliderVal}</p>
            <Box>
                <input style={{ width: '800px' }} type="range" name="slider" id="slider" value={sliderVal} min="0" max="100" step="0.1" onChange={(e) => setSliderVal(e.target.value)} />
            </Box>
            <Box height={50}>
                <Button variant='contained' onClick={(e) => handleClick(e)} >Next</Button>
            </Box>

            <Box>
                <D3Chart
                    sliderVal={sliderVal}
                    redData={data.slice(0, (sliderVal) * 10)}
                    greenData={data.slice((sliderVal) * 10, 1000)}
                />
            </Box>

        </div>
    )
}

export default Home
