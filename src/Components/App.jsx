import React from 'react';
import TableView from './Grid/View/TableView.jsx';
import styles from '../styles/dark.css';
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
        return this.refs.objectBrowser;
    }

    getGraphTreeComponentReference() {
        return this.refs.graphTree;
    }

    getChartComponentReference() {
        return this.refs.chartHOC;
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
                        "type": "tabset",
                        "weight": 50,
                        "selected": 0,
                        "children": [
                            {
                                "type": "tab",
                                "name": "FX",
                                "component": "app",
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
                                "name": "FI",
                                "component": "button",
                                enableClose: false
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
    }

    factory(node) {
        var component = node.getComponent();
        if (component === "button") {
            return <button style={{ width: '400px', border: '1px solid black' }}>{node.getName()}</button>;
        } else if (component === "app") {
            return (
                <div className="appEnclosingDiv">
                    <div className="appContainer">
                        <div className="buttonAndChartContainer">
                            <div className="tablecontainer">
                                <div className="ComponentTitle">Blotter</div>
                                <TableView ref='tableViewRef'
                                    graphTreeComponentReference={this.getGraphTreeComponentReference.bind(this)}
                                    subscriptionTopic={this.state.subscriptionTopic}
                                    rowHeight={this.state.rowHeight} />
                            </div>
                            <div className="chartContainer">
                                <div className="ComponentTitle">Chart</div>
                                <ChartHOC ref='chartHOC' />
                            </div>
                        </div>
                        <div className="graphAndObjectBrowserContainer">
                            <div className="graphContainer">
                                <div className="ComponentTitle">Graph Sources</div>
                                <DagreD3 ref="graphTree"
                                    objectBrowserComponentReference={this.getObjectBrowserComponentReference.bind(this)}
                                    chartComponentReference={this.getChartComponentReference.bind(this)}
                                    qGraphData={{}} />
                            </div>
                            <div className="objectBrowserContainer">
                                <div className="ComponentTitle">Object Browser</div>
                                <ObjectBrowser ref="objectBrowser" />
                            </div>
                        </div>
                    </div>
                </div>
            )
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