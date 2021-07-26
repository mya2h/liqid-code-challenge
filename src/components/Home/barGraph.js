import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../../assets/styles/product.css'


const sample = [
	{ category: 'LIQID Cash', quantity: 920 },
	{ category: 'LIQID Real Estate', quantity: 630 },
	{ category: 'LIQID Wealth', quantity: 850 },
	{ category: 'LIQID Private Equity', quantity: 220 },
	{ category: 'LIQID Venture', quantity: 510 }
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
		else {
			return "#FFFA73"
		}
	}
	const d3Chart = useRef()
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})
	const update = useRef(false)

	useEffect(() => {
		window.addEventListener('resize', () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			})
			if (update.current) {
				d3.selectAll('g').remove()
			} else { update.current = true }
		})
		DrawChart(sample, dimensions)

	}, [dimensions])

	const margin = { top: 50, right: 30, bottom: 30, left: 60 }

	function DrawChart(data, dimensions) {
		const chartwidth = parseInt(d3.select('.d3chart').style('width')) - margin.left - margin.right
		const chartheight = parseInt(d3.select('.d3chart').style('height')) - margin.top - margin.bottom
		const svg = d3.select(d3Chart.current)
			.attr('width', chartwidth + margin.left + margin.right)
			.attr('height', chartheight + margin.top + margin.bottom)

		const x = d3.scaleBand()
			.domain(d3.range(data.length))
			.range([margin.left, chartwidth - margin.right])
			.padding(0.1)

		svg.append('g')
			.attr('transform', 'translate(0,' + chartheight + ')')
			.attr('class', 'x axis')
			.call(d3.axisBottom(x).tickFormat(i => data[i].category).tickSizeOuter(0))


		const max = d3.max(data, function (d) { return d.quantity + 80 })
		const y = d3.scaleLinear()
			.domain([0, max])
			.range([chartheight, margin.top])

		svg.append('g')
		.attr('class', 'y axis')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y).tickFormat(d => d + " €"))


     
		// add tooltips
		var tooltip = d3.select('.tooltip-area__text')
		.style("position", "absolute")
		.style("visibility", "hidden")
		.style('background-color','red')
		.style("border", "solid")
		.style("border-width", "1px")
		.style("border-radius", "5px")
		.style("padding", "10px")
	
		const mouseover = (event, d) => {
			tooltip.style("visibility", "visible")
		};

		const mouseleave = (event, d) => {
			tooltip.style("visibility", "hidden")
		}

		const mousemove = (event, d) => {
			const [x, y] = d3.pointer(event);
			tooltip
			
				.attr('transform', `translate(${x}, ${y})`)
				.style("top", (event.pageY-800)+"px").style("left",(event.pageX-800)+"px")
				.text("The exact value of<br>this cell is: " + d.quantity)
		};

		// Draw bars
		svg.append('g')
			.selectAll('rect')
			.data(data)
			  .join('rect')
            .attr('class', 'bar')
			.attr('x', (d, i) => x(i))
			.attr('y', d => y(d.quantity))
			.attr('height', d => y(0) - y(d.quantity))
			.attr('width', x.bandwidth())
			.attr('fill', function (d) {
				return colorPicker(d); // call the color picker to get the fill.
			})
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave)
			.on("mouseover", mouseover)
			.classed('testclass', true)


		svg.append('g')
			.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text((d) => d.quantity + "€")
			.attr('x', (d, i) => x(i) + x.bandwidth() / 2)
			.attr('y', d => y(d.quantity) - 10)

	}

	return (
		<div className="content">
			<div className="title">
				| Your products
			</div>
			<svg
				ref={d3Chart}
				className="d3chart"

			>
				<g className="plot-area" />
				<g className="plot" />
				<g className="x-axis" />
				<g className="y-axis" />
				<g className="tooltip-area">
					<text className="tooltip-area__text"></text>
				</g>
			</svg>
		</div>
	)
}

export default Chart