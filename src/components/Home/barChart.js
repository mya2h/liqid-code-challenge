import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../../assets/styles/barChart.css'


const data = [
    { category: 'LIQID Cash', quantity: 920 },
    { category: 'LIQID Real Estate', quantity: 630 },
    { category: 'LIQID Wealth', quantity: 850 },
    { category: 'LIQID Private Equity', quantity: 220 },
    { category: 'LIQID Venture', quantity: 510 }
]


const BarChart = () => {

    useEffect(() => {
        DrawChart(data)
    }, [])

    const colorPicker = (v) => {
        if (v.category === "LIQID Cash") {
            return "#D5BDD9";
        } else if (v.category === "LIQID Real Estate") {
            return "rgb(92, 189, 132)";
        }
        else if (v.category === "LIQID Wealth") {
            return "#124366";
        }
        else if (v.category === "LIQID Private Equity") {
            return "#5CB5B2";
        }
        else {
            return "#FFFA73"
        }
    }

    const DrawChart = (data) => {
        var margin = { top: 20, right: 25, bottom: 30, left: 40 },
            width = 650 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).tickFormat(i => data[i].category).tickSizeOuter(0))


        const max = d3.max(data, function (d) { return d.quantity + 80 })
        const y = d3.scaleLinear()
            .domain([0, max])
            .range([height, margin.top])


        svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',0)')
            .call(d3.axisLeft(y).tickFormat(d => `${d} €`))
            .select(".domain").remove()

        var Tooltip = d3.select("#chart")
            .append("div")
            .style("visibility", "hidden")
            .style("position", "absolute")
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-color", "white")
            .style("border-radius", "5px")
            .style("border-bottom-left-radius", "20px")
            .style("width", "200px")
            .style("z-index", 20)

        var mouseover = (d) => {
            Tooltip
                .style("visibility", "visible")
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        var mousemove = (event, d) => {
            const leftPosition = event.pageX
            console.log(leftPosition)
            const topPosition = event.pageY
            Tooltip
                .html(`
                    <div>Total:<span>${d.quantity} €</span></div>
                    <div>Initial invest:<span>${d.quantity} €</span></div>
                    <div>Growth:<span>${d.quantity / 100} %</span></div>`)
                .style("left", `${leftPosition}px`)
                .style("top", `${topPosition}px`)

        }
        var mouseleave = (d) => {
            Tooltip
                .style("visibility", "hidden")
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }

        svg.selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr('x', (d, i) => x(i))
            .attr('y', d => y(d.quantity))
            .attr("rx", 4)
            .attr("ry", 4)
            .attr('height', d => y(0) - y(d.quantity))
            .attr('width', x.bandwidth())
            .attr('fill', function (d) {
                return colorPicker(d);
            })
            .style("stroke-width", 1)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)


        svg.append('g')
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => `${d.quantity} €`)
            .attr('x', (d, i) => x(i) + 30)
            .attr('y', d => y(d.quantity) - 10)


    }

    return (

        <div className="content">
            <div className="title">
                | Your products
            </div>
            <div id="chart">

            </div>
        </div>

    )
}

export default BarChart