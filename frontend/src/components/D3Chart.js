import {React } from 'react'
import * as d3 from 'd3';
function D3Chart(props) {
   
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
].slice(0, (props.sliderVal)%4);
console.log(data)

    const margin = { top: 10, right: 20, bottom: 20, left: 20 }
    const width = 300 - margin.left - margin.right
    const height = 250 - margin.top - margin.bottom

    const svg = d3.select('.chart') // select svg
        // .append('svg')
        // .attr('width', width)
        // .attr('height', height)
        // .style('border', '2px solid black')
        svg.selectAll("*").remove() // remove all the existing nodes from svg if any

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

     // Join data
     const circles = g.selectAll('circle').data(data) // create circles layers 

     // Remove circles from DOM
     circles.remove()
    
     // Enter circles in DOM
     circles.enter() // append circles to svg
       .append('circle')
       .attr('fill', 'red')
       .attr('r', 10)
       .attr('cx', d => d.x)
       .attr('cy', d => d.y)
       .attr('stroke', 'black')

       const remove = d3.selectAll('chart')
       remove.remove()
       circles.remove()

       return(
         <svg
         className='chart'
         style={{
          height: {height},
          width: {width},
        }}
         >

         </svg>
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
