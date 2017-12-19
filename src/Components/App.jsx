import React from 'react';
import TableView from './Grid/View/TableView.jsx';
import styles from '../styles/light.css';
import DagreD3 from './Graph/View/dagreD3.jsx';
import ObjectBrowser from './ObjectBrowser/View/ObjectBrowser.jsx';
import ChartHOC from './Charts/View/ChartHOC.jsx';
import FlexLayout from "flexlayout-react";


class App extends React.Component {

    constructor(props) {
        super(props);
        var json = {
            global: { enableEdgeDock: true, splitterSize: 4 },
            borders: [
                {
                    "type": "border",
                    "location": "right",
                    enableDrop: true,
                    "children": [
                        {
                            "type": "tab",
                            "enableClose": false,
                            "name": "Object Browser",
                            "component": "objectbrowser",
                        }
                    ]
                }
            ],
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
                                "weight": 100,
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
                            // {
                            //     "type": "tabset",
                            //     "weight": 50,
                            //     "selected": 0,
                            //     "children": [
                            //         {
                            //             "type": "tab",
                            //             "name": "Object Browser",
                            //             "component": "objectbrowser",
                            //             enableClose: false
                            //         }
                            //     ]
                            // }
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

    componentDidMount() {
    }

    getObjectBrowserComponentReference() {
        return this.objectBrowserReference;
    }

    getGraphTreeComponentReference() {
        return this.graphReference;
    }

    getChartComponentReference() {
        return this.chartReference;
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

}

export default App;