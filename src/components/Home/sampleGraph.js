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


const Bar = () => {
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
        DrawChart(sample)

    }, [dimensions])

    function DrawChart(data) {
        var margin = { top: 20, right: 25, bottom: 30, left: 40 },
            width = 650 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;
        var svg = d3.select("#div_template")
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
            .call(d3.axisLeft(y).tickFormat(d => d + " €"))
            .select(".domain").remove()

        var Tooltip = d3.select("#div_template")
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

        var mouseover = function (d) {
            Tooltip
                .style("visibility", "visible")
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
        }
        var mousemove = function (event, d) {
            const [x, y] = d3.pointer(event);
            Tooltip
                .html(`
                    <div>Total:  <span>${d.quantity}€</span></div>
                    <div>Initial invest:  <span>${d.quantity}€</span></div>
                    <div>Growth:<span>${d.quantity / 100}%</span></div>`)
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px")

        }
        var mouseleave = function (d) {
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
                return colorPicker(d); // call the color picker to get the fill.
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
            .text((d) => d.quantity + "€")
            .attr('x', (d, i) => x(i) + x.bandwidth() / 2)
            .attr('y', d => y(d.quantity) - 10)


    }

    return (

        <div className="content">
            <div className="title">
                | Your products
            </div>
            <div id="div_template">

            </div>

        </div>

    )
}

export default Bar