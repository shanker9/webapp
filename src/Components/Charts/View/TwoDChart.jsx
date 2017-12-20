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

  constructor(props) {
    super(props);
    props.resizeEventHandler(this.resizeEventHandler.bind(this));
    this.state = {
      dataObject: {},
      chartHeight: 0,
      chartWidth: 0
    }
    this.entriesDatePathComponent = undefined;
    this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  }

  resizeEventHandler(p) {
    console.log('cahrt resize handler');
    let chartHeight = p.rect.height * 0.95;
    let chartWidth = p.rect.width * 0.95;
    this.setState({
      chartHeight: chartHeight,
      chartWidth: chartWidth
    });
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
    const { chartHeight, chartWidth } = this.calculateChartSize();
    this.setState({
      dataObject: formatedDataForAreaChart,
      chartHeight : chartHeight,
      chartWidth : chartWidth
    });
  }

  calculateChartSize() {
    let boundingDiv = document.getElementById('chartBoundingDiv');
    let chartHeight, chartWidth;
    if (boundingDiv) {
      chartHeight = boundingDiv.clientHeight * 0.95;
      chartWidth = boundingDiv.clientWidth * 0.95;
    }
    return { chartHeight, chartWidth };
  }

  render() {
    // const this.state.dataObject = this.getChartData(chartData);
    return (
      <div id='chartBoundingDiv' style={{ flex: 1 }}>
        <AreaChart width={this.state.chartWidth} height={this.state.chartHeight} data={this.state.dataObject.chartData}
          margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
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