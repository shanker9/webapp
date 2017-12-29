import React, { Component } from 'react';
import TwoDChart from './TwoDChart.jsx';
import ThreeDChart from './ThreeDChart.jsx';

class ChartHOC extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chartType: '',
            displayChart: false,
            chartData: {}
        }
        this.twoDChart = undefined;
        this.threeDChart = undefined;

        this.props.reference(this);
    }

    drawChartWithData(params) {
        this.setState({
            chartType: params.chartType,
            chartData: params.chartData
        }, () => {
            switch (params.chartType) {
                case '2D':
                    this.refs.twoDChart.renderChartWithData(params.chartData);
                    break;

                case '3D':
                    this.refs.threeDChart.renderChartWithData(params.chartData);
                    break;

                default:
                    console.log('Invalid Chart Type supplied to the draw method')
            }
        })
    }

    clearChartView(){
        this.setState({
            chartType : 'none',
            chartData : {},
            displayChart : false
        })
    }

    render() {

        if (this.state.chartType === '2D') {
            return (<TwoDChart ref="twoDChart" resizeEventHandler={this.props.resizeEventHandler}/>);
        } else if (this.state.chartType === '3D') {
            return (<ThreeDChart ref="threeDChart" resizeEventHandler={this.props.resizeEventHandler}/>);
        } else {
            return (<div />)
        }
    }

}

export default ChartHOC;