import {React, useState} from 'react'
import D3Chart from './D3Chart'

function Home() {
    const [sliderVal, setSliderVal] = useState(50)

    return (

        <div>
            <p>{sliderVal}</p>
            <input type="range" name="slider" id="slider" value={sliderVal} min="0" max="100" step="0.5" onChange={(e) => setSliderVal(e.target.value)} />

            <D3Chart sliderVal={sliderVal} />
        </div>
    )
}

export default Home
