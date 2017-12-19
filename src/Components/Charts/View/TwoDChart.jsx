import React, { Component } from 'react';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Label,
  Text
} from 'recharts';

class TwoDChart extends Component {

  constructor() {
    super();

    this.state = {
      dataObject: {},
    }
    this.entriesDatePathComponent = undefined;
    this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  }

  componentDidMount() {

  }

  componentWillUpdate() {
    // let boundingDiv = document.getElementById('chartBoundingDiv');
    // // this.setState({
    // //   chartWidth: boundingDiv.clientWidth,
    // //   chartHeight : boundingDiv.clientHeight
    // // })
    // this.chartHeight = boundingDiv.parentElement.clientHeight;
    // this.chartWidth = boundingDiv.parentElement.clientWidth;
  }

  getChartData(graphData) {
    let chartData = [];
    let dataMin, dataMax;
    graphData.forEach(item => {
      let xVal = this.getFormatedDate(item),
        yVal = item.value * 100;

      dataMin = dataMin === undefined ? yVal : (dataMin > yVal ? yVal : dataMin);
      dataMax = dataMax === undefined ? yVal : (dataMax < yVal ? yVal : dataMax);

      chartData.push({ time: xVal, rate: yVal });
    })
    dataMax = dataMax.toFixed(2);
    dataMin = dataMin.toFixed(2);
    // let ticksInterval = ((dataMax - dataMin) / chartData.length).toFixed(2);
    return { chartData, dataMin, dataMax };
  }

  getFormatedDate(item) {
    let d = new Date(parseInt(item[this.entriesDatePathComponent].value * 1000, 10));
    return `${d.getDate()}${this.monthNames[d.getMonth()]}${d.getFullYear()}`;
  }

  renderChartWithData(dataParams) {
    this.entriesDatePathComponent = dataParams.datePathComponent;
    let formatedDataForAreaChart = this.getChartData(dataParams.data);
    this.setState({ dataObject: formatedDataForAreaChart });
  }

  calculateChartSize() {
    let boundingDiv = document.getElementById('chartBoundingDiv');
    if (boundingDiv) {
      this.chartHeight = boundingDiv.parentElement.clientHeight;
      this.chartWidth = boundingDiv.parentElement.clientWidth;
    }
    console.log('chart render');
  }

  render() {
    this.calculateChartSize();
    // const this.state.dataObject = this.getChartData(chartData);
    return (
      <div id='chartBoundingDiv' style={{ flex: 1 }}>
        <AreaChart width={this.chartWidth} height={this.chartHeight} data={this.state.dataObject.chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="time"
            tickCount={2}
            interval={10}
          />
          <YAxis domain={['auto', this.state.dataObject.dataMax]}
            allowDecimals={true}
            tickCount={8}
          >
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='rate'
            dot={true}
            stroke='#316086'
            fill='#bfe2ff'
          />
          <Text width={10} />
        </AreaChart>
      </div>
    );
  }
}

class CustomizedLabel extends Component {
  render() {
    const { x, y, stroke, value } = this.props;
    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={5} transform="rotate(-90)" textAnchor="end">{value}</text>
  }
}

export default TwoDChart;