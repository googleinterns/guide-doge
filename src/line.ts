import * as d3 from 'd3';
import goog from './goog.csv';

interface Data {
  date: Date;
  value: number;
}

async function getData(): Promise<Data[]> {
  return d3.csv(goog, (d) => ({date: new Date(d.Date), value: Number(d.Close)}));
}

export async function createLineChart() {
  const height = 500;
  const width = 800;
  const margin = ({top: 20, right: 30, bottom: 30, left: 40});

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const data = await getData();

  const xAxis = (g) => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
  const yAxis = (g) => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text('$ closing price'));

  const x = d3.scaleUtc()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

  const line = d3.line()
      .defined(d => !isNaN(d.value))
      .x(d => x(d.date))
      .y(d => y(d.value))

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  return svg.node();
}
