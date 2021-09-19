import { Box, Button, Input, Slider } from '@material-ui/core'
import { React, useEffect, useState } from 'react'
import D3Chart from './D3Chart'
import { data } from './Data'

function Home() {
    const [sliderVal, setSliderVal] = useState(50)

    // useEffect(()=>{
    //     console.log('use effect');
    // }, [])



    const handleChange = () => {

    }
    return (

        <div>
            <p>{sliderVal}</p>
            <Box>
                <input style={{ width: '800px' }} type="range" name="slider" id="slider" value={sliderVal} min="0" max="100" step="0.1" onChange={(e) => setSliderVal(e.target.value)} />
            </Box>
            <Box height={50}>
                <Button variant='contained' onClick={(e) => handleChange(e)} >Next</Button>
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
