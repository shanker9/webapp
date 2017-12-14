import React from 'react';
import TableView from './Grid/View/TableView.jsx';
// import styles from '../styles/AppStyles.css';
import DagreD3 from './Graph/View/dagreD3.jsx';
import ObjectBrowser from './ObjectBrowser/View/ObjectBrowser.jsx';
import ChartHOC from './Charts/View/ChartHOC.jsx';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            rowHeight: 20,
            subscriptionTopic: 'ProductUI'
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


    render() {
        return (
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
                            <ChartHOC ref='chartHOC'/>
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

        );
    }

}

export default App;