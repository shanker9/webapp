import React from 'react';
import TableView from './Grid/View/TableView.jsx';
import styles from '../styles/light.css';
import DagreD3 from './Graph/View/dagreD3.jsx';
import ObjectBrowser from './ObjectBrowser/View/ObjectBrowser.jsx';
import ChartHOC from './Charts/View/ChartHOC.jsx';
import FlexLayout from "flexlayout-react";


class App extends React.Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         rowHeight: 20,
    //         subscriptionTopic: 'ProductUI'
    //     }
    // }

    componentDidMount() {
    }

    getObjectBrowserComponentReference() {
        // return this.refs.objectBrowser;
        return this.objectBrowserReference;
    }

    getGraphTreeComponentReference() {
        // return this.refs.graphTree;
        return this.graphReference;
    }

    getChartComponentReference() {
        // return this.refs.chartHOC;
        return this.chartReference;
    }

    // passNewDatato3DChart() {
    //     this.get3DChartComponentReference().formatData();
    // }

    constructor(props) {
        super(props);
        var json = {
            global: { enableEdgeDock: true },
            borders: [],
            layout: {
                "type": "row",
                "weight": 100,
                "children": [
                    {
                        "type": "row",
                        "weight": 60,
                        "children": [
                            {
                                "type": "tabset",
                                "weight": 50,
                                "selected": 0,
                                "children": [
                                    {
                                        "type": "tab",
                                        "name": "Blotter",
                                        "component": "blotter",
                                        enableClose: false
                                    }
                                ]
                            }]
                    },
                    {
                        "type": "row",
                        "weight": 40,
                        "children": [
                            {
                                "type": "tabset",
                                "weight": 50,
                                "selected": 0,
                                "children": [
                                    {
                                        "type": "tab",
                                        "name": "Graph",
                                        "component": "graph",
                                        enableClose: false
                                    }
                                ]
                            },
                            {
                                "type": "tabset",
                                "weight": 50,
                                "selected": 0,
                                "children": [
                                    {
                                        "type": "tab",
                                        "name": "Chart",
                                        "component": "chart",
                                        enableClose: false
                                    }
                                ]
                            },
                            {
                                "type": "tabset",
                                "weight": 50,
                                "selected": 0,
                                "children": [
                                    {
                                        "type": "tab",
                                        "name": "Object Browser",
                                        "component": "objectbrowser",
                                        enableClose: false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
        this.state = {
            model: FlexLayout.Model.fromJson(json),
            rowHeight: 20,
            subscriptionTopic: 'ProductUI'
        };
        this.graphReference = undefined;
        this.objectBrowserReference = undefined;
        this.chartReference = undefined;
    }

    getGridView() {
        return (
            <div className="tablecontainer">
                <TableView ref='tableViewRef'
                    graphTreeComponentReference={this.getGraphTreeComponentReference.bind(this)}
                    subscriptionTopic={this.state.subscriptionTopic}
                    rowHeight={this.state.rowHeight} />
            </div>
        );
    }

    getGraphView() {
        return (
            <div className="graphContainer">
                <DagreD3 ref="graphTree"
                    reference={ref => this.graphReference = ref}
                    objectBrowserComponentReference={this.getObjectBrowserComponentReference.bind(this)}
                    chartComponentReference={this.getChartComponentReference.bind(this)}
                    qGraphData={{}} />
            </div>
        )
    }

    getChartView() {
        return (
            <div className="chartContainer">
                <ChartHOC ref='chartHOC'
                    reference={ref => this.chartReference = ref}
                />
            </div>
        )
    }

    getObjectBrowserView() {
        return (
            <div className="objectBrowserContainer">
                <ObjectBrowser ref="objectBrowser"
                    reference={ref => this.objectBrowserReference = ref}
                />
            </div>
        )
    }


    factory(node) {
        var component = node.getComponent();
        switch (component) {
            case 'blotter':
                return this.getGridView();
                break;

            case 'graph':
                return this.getGraphView();
                break;

            case 'chart':
                return this.getChartView();
                break;

            case 'objectbrowser':
                return this.getObjectBrowserView();
                break;

            default:
                console.log('invalid view type');
                return <div />
        }
    }

    render() {
        return (
            <FlexLayout.Layout model={this.state.model} factory={this.factory.bind(this)} />
        )
    }


    // render() {
    //     return (
    // <div className="appEnclosingDiv">
    //     <div className="appContainer">
    //         <div className="buttonAndChartContainer">
    //             <div className="tablecontainer">
    //                 <div className="ComponentTitle">Blotter</div>
    //                 <TableView ref='tableViewRef'
    //                     graphTreeComponentReference={this.getGraphTreeComponentReference.bind(this)}
    //                     subscriptionTopic={this.state.subscriptionTopic}
    //                     rowHeight={this.state.rowHeight} />
    //             </div>
    //             <div className="chartContainer">
    //                 <div className="ComponentTitle">Chart</div>
    //                 <ChartHOC ref='chartHOC'/>
    //             </div>
    //         </div>
    //         <div className="graphAndObjectBrowserContainer">
    //             <div className="graphContainer">
    //                 <div className="ComponentTitle">Graph Sources</div>
    //                 <DagreD3 ref="graphTree"
    //                     objectBrowserComponentReference={this.getObjectBrowserComponentReference.bind(this)}
    //                     chartComponentReference={this.getChartComponentReference.bind(this)}
    //                     qGraphData={{}} />
    //             </div>
    //             <div className="objectBrowserContainer">
    //                 <div className="ComponentTitle">Object Browser</div>
    //                 <ObjectBrowser ref="objectBrowser" />
    //             </div>
    //         </div>
    //     </div>
    //     {/* <div style={{backgroundColor:'yellow',resize:'both',width:'100px',height:'50px', overflow:'auto'}} resizeable="true"></div> */}
    // </div>

    //     );
    // }

}

export default App;