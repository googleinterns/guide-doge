import * as d3 from 'd3';
import { DateTime } from 'luxon'
import { generateCube } from './datagen/generation';
import { categories, measures } from './data_config';
import { betweenDates } from './datagen/filters';

interface Data {
  date: Date;
  value: number;
}

const cube = generateCube(categories, measures);

function getData(): Data[] {
  const endDate = DateTime.local();
  const startDate = endDate.minus({ day: 30 });

  const data = cube.getDataFor(
    ['nthDay'], 
    ['activeUsers'], 
    [betweenDates(
        new Date(startDate.toMillis()), 
        new Date(endDate.toMillis()))
        ]
        );
  return data.map((datum) => ({
      date: startDate.plus({ days: datum.categories.get('nthDay') }),
      value: datum.values.get('activeUsers')!,
  }));
}

export async function createLineChart() {
  const height = 500;
  const width = 800;
  const margin = ({top: 20, right: 30, bottom: 30, left: 40});

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const data = getData();

  const xAxis = (g: d3.Selection<SVGGElement>) => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
  const yAxis = (g: d3.Selection<SVGGElement>) => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text('Active Users'));

  const x = d3.scaleUtc()
      .domain(d3.extent<Data, Date>(data, (d) => d.date) as [Date, Date])
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
