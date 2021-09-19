import { React, useEffect } from 'react'
import * as d3 from 'd3';

function D3Chart({redData, greenData}) {

  useEffect(() => {
    var dataRed = redData
    var dataGreen = greenData
    const margin = { top: 20, right: 0, bottom: 0, left: 20 }
    const width = 450 - margin.left - margin.right
    const height = 450 - margin.top - margin.bottom
    const svg = d3.selectAll('.area svg') // select svg
    // .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom )
    .style('border', '2px solid black')
    .style('background', 'black')

    // console.log(svg);
  svg.selectAll("circle").remove() // remove all the existing nodes from svg if any

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // Join data
  const circleRed = g.selectAll('circle').data(dataRed) // create circles layers
  const circleGreen = g.selectAll('circle').data(dataGreen) // create circles layers

  // Enter circles in DOM
  circleRed.enter() // append circles to svg
    .append('circle')
    .attr('fill', 'none')
    .attr('r', 3)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('stroke', '#FF0000')
    .attr('stroke-width', 1.5)
  circleGreen.enter() // append circles to svg
    .append('circle')
    .attr('fill', 'none')
    .attr('r', 3)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('stroke', '#66FF00')
    .attr('stroke-width', 1.5)

  circleRed.remove()
  circleGreen.remove()

  }, [redData, greenData])

  return (
    <div className='area'>
      <svg
        className='chart'
      >
      </svg>
    </div>
  )

  // const renderCircles = (n) => {
  //     // Slice data array
  //     const newData = data.slice(0, n)



  //   }

  //   const updateCircles = (e) => {
  //     renderCircles(setInput(e.target.value))
  //   }


  //   renderCircles(input)



  // return (

  //     <div>

  //         <div className='chart'>
  //         </div>
  //     </div>
  // )
}

export default D3Chart
