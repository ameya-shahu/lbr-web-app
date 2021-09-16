import {React, useState} from 'react'
import * as d3 from 'd3';
function D3Chart() {
    const [input, setInput] = useState(0)

    const margin = { top: 10, right: 20, bottom: 20, left: 20 }
    const width = 300 - margin.left - margin.right
    const height = 250 - margin.top - margin.bottom

    const svg = d3.select('.chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('border', '2px solid black')

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const slider = document.querySelector('#slider')

    let data = [{
        x: 13,
        y: 38
      },
      {
        x: 32,
        y: 25
      },
      {
        x: 28,
        y: 17
      }
    ]


    const renderCircles = (n) => {
        // Slice data array
        const newData = data.slice(0, n)

        // Join data
        const circles = g.selectAll('circle').data(newData)

        // Remove circles from DOM
        circles.remove()

        // Enter circles in DOM
        circles.enter()
          .append('circle')
          .attr('fill', 'red')
          .attr('r', 10)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('stroke', 'black')

          const remove = d3.selectAll('chart')
          remove.remove()
          circles.remove()

      }

      const updateCircles = (e) => {
        renderCircles(setInput(e.target.value))
      }


      renderCircles(input)



    return (

        <div>
            <input type="range" name="slider" id="slider" value={input} min="0" max="3" step="1" onChange={(e) => updateCircles(e)} />
            <div className='chart'>

            </div>
        </div>
    )
}

export default D3Chart
