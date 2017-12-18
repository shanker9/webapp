import React from 'react';
import TableView from './Grid/View/TableView.jsx';
// import styles from '../styles/AppStyles.css';
import DagreD3 from './Graph/View/dagreD3.jsx';
import ObjectBrowser from './ObjectBrowser/View/ObjectBrowser.jsx';
import ChartHOC from './Charts/View/ChartHOC.jsx';
import Dock from 'react-dock';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            rowHeight: 20,
            subscriptionTopic: 'ProductUI',
            isVisible: true
        }
    }

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


    // render() {
    //     return (
    //         <div className="appEnclosingDiv">
    //             <div className="appContainer">
    //                 <div className="gridAndChartContainer">
    //                     <div className="tablecontainer">
    //                         <div className="ComponentTitle">Blotter</div>
    //                         <TableView ref='tableViewRef'
    //                             graphTreeComponentReference={this.getGraphTreeComponentReference.bind(this)}
    //                             subscriptionTopic={this.state.subscriptionTopic}
    //                             rowHeight={this.state.rowHeight} />
    //                     </div>
    //                     <div className="chartContainer">
    //                         <div className="ComponentTitle">Chart</div>
    //                         <ChartHOC ref='chartHOC'/>
    //                     </div>
    //                 </div>
    //                 <div className="graphAndObjectBrowserContainer">
    //                     <div className="graphContainer">
    //                         <div className="ComponentTitle">Graph Sources</div>
    //                         <DagreD3 ref="graphTree"
    //                             objectBrowserComponentReference={this.getObjectBrowserComponentReference.bind(this)}
    //                             chartComponentReference={this.getChartComponentReference.bind(this)}
    //                             qGraphData={{}} />
    //                     </div>
    //                     <div className="objectBrowserContainer">
    //                         <div className="ComponentTitle">Object Browser</div>
    //                         <ObjectBrowser ref="objectBrowser" />
    //                     </div>
    //                 </div>
    //             </div>
    //             {/* <div style={{backgroundColor:'yellow',resize:'both',width:'100px',height:'50px', overflow:'auto'}} resizeable="true"></div> */}
    //         </div>

    //     );
    // }

    divClick() {
        this.setState({ isVisible: !this.state.isVisible });
    }

    render() {
        return (
            <Dock position='left' isVisible={this.state.isVisible}>
                <div id='randomDiv' style={{ backgroundColor: 'steelblue' }} onClick={this.divClick.bind(this)}>X</div>
                {/* you can pass a function as a child here */}
                <div className="appEnclosingDiv">
                    <div className="appContainer">
                        <div className="gridAndChartContainer">
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
                    {/* <div style={{backgroundColor:'yellow',resize:'both',width:'100px',height:'50px', overflow:'auto'}} resizeable="true"></div> */}
                </div>
            </Dock>
        );
    }

}

export default App;