import { Box, Input, Slider } from '@material-ui/core'
import { React, useState } from 'react'
import D3Chart from './D3Chart'
import { data } from './Data'

function Home() {
    const [sliderVal, setSliderVal] = useState(50)
    
    return (

        <div>
            <p>{sliderVal}</p>
            {/* <Box width={10000}>
                <Input
                width={700}
                    // type='range'
                    value={sliderVal}
                    aria-label="Default"
                    // valueLabelDisplay="auto"
                    onChange={(e) => setSliderVal(e.target.value)}
                    inputProps={{
                        step: 0.1,
                        min: 0,
                        max: 100,
                        type: 'range',
                        'aria-labelledby': 'input-slider',
                      }}
                ></Input>
            </Box> */}
            <input style={{ width: '800px'}} type="range" name="slider" id="slider" value={sliderVal} min="0" max="100" step="0.1" onChange={(e) => setSliderVal(e.target.value)} />

            <D3Chart sliderVal={sliderVal} dataRed={data.slice(0, (sliderVal) * 10)} dataGreen={data.slice((sliderVal) * 10, 1000)} />
        </div>
    )
}

export default Home
