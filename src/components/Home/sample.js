import { useD3 } from "./hooks/useD3";
import React from "react";
import * as d3 from "d3";
import '../../assets/styles/product.css'
function BarChart() {
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
   const  data=[
    {category:'LIQID Cash', quantity: 920},
    {category:'LIQID Real Estate', quantity: 630},
    {category:'LIQID Wealth', quantity: 850},
    {category:'LIQID Private Equity', quantity: 220},
    {category:'LIQID Venture', quantity: 510}
    ] 
    // {category:1989, quantity: 920},
    // {category:1992, quantity: 630},
    // {category:1993, quantity: 850},
    // {category:1998, quantity: 220},
    // {category:2000, quantity: 510}
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleBand()    
        .domain(data.map((d) => d.category))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.quantity)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y1).tickFormat(d=>d+" €"))
      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      var tooltip = d3.select('.tooltip-area')
        .style('opacity', 0);

      const mouseover = (event, d) => {
        tooltip.style("opacity", 1);
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

      svg
        .select(".plot-area")
        // .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr('fill',function(d) {
            return colorPicker(d); // call the color picker to get the fill.
        })
        .attr("class", "bar")
        .attr("x", (d) => x(d.category))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.quantity))
        .attr("height", (d) => y1(0) - y1(d.quantity))
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("mouseover", mouseover);

        svg
        .selectAll('.bar-label')
        .data(data)
        .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', d => x(d.category) + x.bandwidth()/2)
        .attr('dx', 0)
        .attr('y', d => y1(d.quantity))
        .attr('dy', -6)
        .text(d => d.quantity+" €");
    },

    [data.length]
  );

  return (
    <>
      <svg
        ref={ref}
        style={{
          height: "90vh",
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="plot" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="tooltip-area">
          <text className="tooltip-area__text"></text>
        </g>
      </svg>
    </>
  );
}

export default BarChart;