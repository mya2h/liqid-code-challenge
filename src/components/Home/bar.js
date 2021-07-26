import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../../assets/styles/product.css'


const sample = [
        {category:'LIQID Cash', quantity: 920},
        {category:'LIQID Real Estate', quantity: 630},
        {category:'LIQID Wealth', quantity: 850},
        {category:'LIQID Private Equity', quantity: 220},
        {category:'LIQID Venture', quantity: 510}
]


const Chart = () => {
    function colorPicker(v) {
        if (v.category == "LIQID Cash") {
          return "#D5BDD9";
        } else if (v.category == "LIQID Real Estate") {
          return "#A1CCBB";
        }
        else if (v.category == "LIQID Wealth") {
            return "#124366";
          }
          else if (v.category == "LIQID Private Equity") {
            return "#5CB5B2";
          }
          else{
              return "#FFFA73"
          }
      }
	const d3Chart = useRef()
	// Ref for updating dimention 
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})
	// Ref for resize event update
	const update = useRef(false)

	useEffect(()=>{

		// Listen for any resize event update
		window.addEventListener('resize', ()=>{
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			})

			// If resize, remove the previous chart
			if(update.current){
				d3.selectAll('g').remove()
			} else {update.current = true}
		})

		// Draw chart using the data and updated dimensions
		DrawChart(sample,dimensions)

	},[dimensions])

	const margin = {top: 50, right:30, bottom: 30, left:60}

	function DrawChart(data, dimensions){

		// console.log(dimensions.width, dimensions.height)

		const chartwidth = 700 - margin.left - margin.right
		const chartheight = 500 - margin.top - margin.bottom
		const svg = d3.select(d3Chart.current)
						.attr('width', chartwidth + margin.left + margin.right)
						.attr('height', chartheight + margin.top + margin.bottom)
              

		// x scale
		const x = d3.scaleBand()
					.domain(d3.range(data.length))
					.range([margin.left, chartwidth - margin.right])
					.padding(0.1)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartheight + ')')
			.call(d3.axisBottom(x).tickFormat(i=>data[i].category).tickSizeOuter(0))
			

		const max = d3.max(data, function(d){return d.quantity+80})

		// y scale
		const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartheight, margin.top])

		svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y).tickFormat(d=>d+" €"))
        
        
        // add tooltips
		var tooltip = d3.select('.tooltip-area')
        .style('top', 20);

      const mouseover = (event, d) => {
        tooltip.style("top", "20px");
      };

      const mouseleave = (event, d) => {
        // tooltip.style('opacity', 0);
      }

      const mousemove = (event, d) => {
        const text = d3.select('.tooltip-area__text');
        text.text(`Total:  ${d.quantity}
        Initial invest: ${d.quantity}
        Growth: ${d.quantity}
        `);
        const [x, y] = d3.pointer(event);

        tooltip
          .attr('transform', `translate(${x}, ${y})`);
      };

		// Draw bars
		svg.append('g')
			.selectAll('rect')
			.data(data)
			.join('rect')
			.attr('x', (d,i) => x(i))
			.attr('y', d => y(d.quantity))
				.attr('height', d=>y(0)-y(d.quantity))
				.attr('width', x.bandwidth())
                .attr('fill',function(d) {
                    return colorPicker(d); // call the color picker to get the fill.
                  })
				  .on("mousemove", mousemove)
				  .on("mouseleave", mouseleave)
				  .on("mouseover", mouseover)		
				  .classed('testclass', true)  
                // .style("border", "none"); 
				
               
            svg.append('g')
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text((d) => d.quantity+"€")
                .attr('x', (d,i) => x(i)+ x.bandwidth()/2)
				.attr('y', d => y(d.quantity))   

	}

	return (
		<div id='d3demo'>
		  <svg ref={d3Chart}>
              <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="tooltip-area">
          <text className="tooltip-area__text">aas</text>
        </g>
          </svg>
		</div>
	)
}

export default Chart