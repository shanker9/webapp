import React, { Component } from 'react';
import TwoDChart from './TwoDChart.jsx';
import ThreeDChart from './ThreeDChart.jsx';

class ChartHOC extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chartType: 'none',
            displayChart: false,
            chartData: {}
        }
        this.props.reference(this);
    }

    drawChartWithData(params) {
        this.setState({
            chartType: params.chartType,
            chartData: params.chartData
        })
    }

    clearChartView() {
        this.setState({
            chartType: 'none',
            chartData: {},
            displayChart: false
        })
    }

    getChartView() {
        switch(this.state.chartType){
            case '2D':
            return (<TwoDChart ref="twoDChart" chartData={this.state.chartData} resizeEventHandler={this.props.resizeEventHandler} />)
            break;
            
            case '3D':
            return (<ThreeDChart ref="threeDChart" chartData={this.state.chartData} resizeEventHandler={this.props.resizeEventHandler} />)
            break;

            default:
            return <div/>
        }           
    }

    render() {
        return this.getChartView();
    }

}

export default ChartHOC;