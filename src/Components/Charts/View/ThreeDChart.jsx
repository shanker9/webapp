import React, { Component } from 'react';
import vis from 'vis';

class ThreeDChart extends Component {
    constructor() {
        super();

        this.state = {
            volData: [],
        }

        this.data = null;
        this.graph = null;
        this.render3DChart = this.render3DChart.bind(this);
        this.chartWidth = 0;
        this.chartHeight = 0;
        this.graph3d = undefined;
        this.dataSet = undefined;
        this.layoutOptions = undefined;
        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    }

    componentDidMount() {

        let boundingDiv = document.getElementById('chartBoundingDiv');
        this.chartHeight = boundingDiv.clientHeight;
        this.chartWidth = boundingDiv.clientWidth;
        this.render3DChart();
        // this.testRender();
    }


    render3DChart() {
        // Create and populate a data table.
        // this.dataSet = new vis.DataSet();

        // let formatedArray = [], id = 0;
        // this.volsurfaceData.forEach(item => {
        //     item.strikes.forEach((val, index) => {
        //         formatedArray.push({ x: item.maturity.value / 1000, y: Math.round(val * 100), z: Math.round(item.vols[index] * 100) });
        //         id++;
        //     })
        // });

        // this.dataSet.add(formatedArray);   

        // specify options
        this.layoutOptions = {
            width: '95%',
            height: '95%',
            style: 'surface',
            xLabel: 'maturity',
            yLabel: 'strikes',
            zLabel: 'vols',
            legendLabel: 'Vols',
            showPerspective: false,
            showGrid: true,
            showShadow: true,
            keepAspectRatio: true,
            showLegend: true,
            backgroundColor: 'white',
        };


        let container = document.getElementById('chartBoundingDiv');
        this.graph3d = new vis.Graph3d(container, this.dataSet, this.layoutOptions);
    }

    getFormatedDate(value) {
        let d = new Date(value);
        return `${d.getDate()}${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
    }

    renderChartWithData(dataParams) {
        let data = new vis.DataSet();
        let formatedArray = []
        dataParams.data.forEach(item => {
            item.strikes.forEach((val, index) => {
                formatedArray.push({ x: item.maturity.value * 1000, y: val, z: item.vols[index] });
            })
        });

        data.add(formatedArray);

        this.layoutOptions = {
            width: '95%',
            height: '95%',
            style: 'surface',
            xLabel: 'maturity',
            xValueLabel: value => this.getFormatedDate(value),
            xStep: data.max('x').x,
            yLabel: 'strikes',
            zLabel: 'vols',
            zMin: data.min('z').z,
            legendLabel: 'Vols',
            tooltip: point => `maturity: ${this.getFormatedDate(point.x)}</br>\
            strike: ${point.y}</br>vol:${point.z}`,
            showPerspective: false,
            showGrid: true,
            showShadow: false,
            keepAspectRatio: false,
            verticalRatio: 1,
            showLegend: true,
            backgroundColor: 'white',
        };

        // var camera = this.graph3d ? this.graph3d.getCameraPosition() : null;

        this.graph3d.setOptions(this.layoutOptions);
        this.graph3d.setData(data);

        // if (camera) {
        //     this.graph3d.setCameraPosition(camera);
        // } // Reset camera to default
        // else {
            var pos = { horizontal: 1.0, vertical: 0.5, distance: 2.5 };
            this.graph3d.setCameraPosition(pos);
        // }
    }

    render() {
        return (
            <div id="chartBoundingDiv" style={{ flex: 1, font: '5px' }} />
        );
    }
}

export default ThreeDChart;