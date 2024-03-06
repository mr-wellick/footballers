import {
  ScaleBand,
  ScaleLinear,
  scaleBand,
  scaleLinear,
} from 'd3-scale';
import {
  axisBottom,
  axisLeft,
  position,
} from '../../old-src/utils/attribute';

interface Data {
  name: string;
  g: number;
}
interface Dim {
  width: number;
  height: number;
  padding: number;
}

const XAxis = (props: {
  data: Data[];
  dim: Dim;
  scale: ScaleBand<string>;
}) => {
  return (
    <g
      transform={`translate(0,${
        props.dim.height - props.dim.padding
      })`}
    >
      <path d={axisBottom(props.scale)} />
      {props.data.map((datum) => {
        return (
          <g
            transform={`translate(${position(props.scale)(
              datum.name,
            )}, 0)`}
          >
            <line y2="6" stroke="#000" />
            <text
              class="text-sm"
              dy="0.71em"
              y="10"
              transform="rotate(45)"
            >
              {datum.name.split(' ')[0]}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const YAxis = (props: {
  data: Data[];
  dim: Dim;
  scale: ScaleLinear<number, number>;
}) => {
  return (
    <g transform={`translate(${props.dim.padding}, 0)`}>
      <path d={axisLeft(props.scale)} />
      {props.scale.ticks().map((tick) => {
        return (
          <g
            transform={`translate(0, ${position(props.scale)(tick)})`}
          >
            <line x2="-6" stroke="#000" />
            <text class="text-sm" x="-30">
              {tick}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const Rects = (props: {
  data: Data[];
  dim: Dim;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
}) => {
  return (
    <g>
      {props.data.map((datum) => {
        return (
          <g>
            <rect
              x={props.xScale(datum.name)}
              y={props.yScale(datum.g)}
              height={props.yScale.range()[0] - props.yScale(datum.g)}
              width={props.xScale.bandwidth()}
              fill="#DCC8E0"
              opacity="0.9"
            />
          </g>
        );
      })}
    </g>
  );
};

const Graph = (props: { data: Data[] }) => {
  const dim = { width: 1300, height: 500, padding: 100, scaleBy: 2 };
  const xScale = scaleBand()
    .domain(props.data.map((item) => item.name))
    .range([dim.padding, dim.width - dim.padding])
    .padding(0.1);
  const yScale = scaleLinear()
    .domain([0, Math.max(...props.data.map((item) => item.g))])
    .range([dim.height - dim.padding, dim.padding]);

  return (
    <svg height={dim.height} width={dim.width}>
      <XAxis data={props.data} dim={dim} scale={xScale} />
      <YAxis data={props.data} dim={dim} scale={yScale} />
      <Rects
        data={props.data}
        dim={dim}
        xScale={xScale}
        yScale={yScale}
      />
    </svg>
  );
};

export default Graph;
