import React from 'react';
import TableView from './Grid/View/TableView.jsx';
import styles from '../styles/light.css';
import DagreD3 from './Graph/View/dagreD3.jsx';
import ObjectBrowser from './ObjectBrowser/View/ObjectBrowser.jsx';
import ChartHOC from './Charts/View/ChartHOC.jsx';
import FlexLayout from "flexlayout-react";
import GoldenLayout from 'golden-layout';

class App extends React.Component {

    constructor(props) {
        super(props);
        // var json = {
        //     global: { enableEdgeDock: true, splitterSize: 4 ,tabSetEnableTabStrip:true},
        //     borders: [
        //         {
        //             "type": "border",
        //             "location": "right",
        //             enableDrop: true,
        //             "children": [
        //                 {
        //                     "type": "tab",
        //                     "enableClose": false,
        //                     "name": "Object Browser",
        //                     "component": "objectbrowser",
        //                 }
        //             ]
        //         }
        //     ],
        //     layout: {
        //         "type": "row",
        //         "weight": 100,
        //         children: [{
        //             type: 'row',
        //             weight: 100,
        //             "children": [
        //                 {
        //                     "type": "row",
        //                     "weight": 50,
        //                     "children": [
        //                         {
        //                             "type": "tabset",
        //                             "weight": 100,
        //                             "selected": 0,
        //                             "children": [
        //                                 {
        //                                     "type": "tab",
        //                                     "name": "Blotter",
        //                                     "component": "blotter",
        //                                     enableClose: false
        //                                 }
        //                             ]
        //                         }]
        //                 },
        //                 {
        //                     "type": "row",
        //                     "weight": 50,
        //                     "children": [
        //                         {
        //                             "type": "tabset",
        //                             "weight": 50,
        //                             "selected": 0,
        //                             "children": [
        //                                 {
        //                                     "type": "tab",
        //                                     "name": "Graph",
        //                                     "component": "graph",
        //                                     enableClose: false
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "type": "tabset",
        //                             "weight": 50,
        //                             "selected": 0,
        //                             "children": [
        //                                 {
        //                                     "type": "tab",
        //                                     "name": "Chart",
        //                                     "component": "chart",
        //                                     enableClose: false
        //                                 }
        //                             ]
        //                         },
        //                         // {
        //                         //     "type": "tabset",
        //                         //     "weight": 50,
        //                         //     "selected": 0,
        //                         //     "children": [
        //                         //         {
        //                         //             "type": "tab",
        //                         //             "name": "Object Browser",
        //                         //             "component": "objectbrowser",
        //                         //             enableClose: false
        //                         //         }
        //                         //     ]
        //                         // }
        //                     ]
        //                 }
        //             ]
        //         }]

        //     }
        // };

        // this.config = {
        //     content: [{
        //         type: 'row',
        //         content: [
        //             {
        //                 title: 'A react component',
        //                 type: 'react-component',
        //                 component: 'testItem',
        //                 // componentName: 'testItem',
        //                 props: { rowHeight: 20, subscriptionTopic: 'ProductUI' }
        //             },
        //             {
        //                 title: 'Another react component',
        //                 type: 'react-component',
        //                 component: 'testItem',
        //                 // componentName: 'testItem',
        //                 props: { rowHeight: 20, subscriptionTopic: 'ProductUI' }                        
        //             }
        //         ]
        //     }]
        // };

        this.config = {
            content: [{
                type: 'row',
                content: [{
                    type: 'column',
                    content: [
                        {   
                            title : 'Blotter',
                            type: 'react-component',
                            component: 'blotter',
                            props: { rowHeight: 20, subscriptionTopic: 'ProductUI' }
                        },
                        {   
                            title : 'Object Browser',
                            type: 'react-component',
                            component: 'objectbrowser',
                            props: {data:{}}
                        }
                    ]
                }, {
                    type: 'column',
                    content: [
                        {   
                            title: 'Graph',
                            type: 'react-component',
                            component: 'graph',
                            props: { qGraphData:{} }
                        },
                        {   
                            title: 'Chart',
                            type: 'react-component',
                            component: 'chart',
                            props: { rowHeight: 20, subscriptionTopic: 'ProductUI' }
                        }
                    ]
                }]
            }]
        };

        this.state = {
            // model: FlexLayout.Model.fromJson(json),
            rowHeight: 20,
            subscriptionTopic: 'ProductUI'
        };
        this.graphReference = undefined;
        this.objectBrowserReference = undefined;
        this.chartReference = undefined;

        // //EventHandler references
        // this.chartResizeEventHandler = undefined;
        // this.graphResizeEventHandler = undefined;
    }

    componentDidMount() {
        var myLayout = new GoldenLayout(this.config);

        myLayout.registerComponent('blotter', TableView);
        myLayout.registerComponent('objectbrowser', ObjectBrowser);
        myLayout.registerComponent('graph', DagreD3);        
        myLayout.registerComponent('chart', ChartHOC);
        
        myLayout.init();
    }

    // getObjectBrowserComponentReference() {
    //     return this.objectBrowserReference;
    // }

    // getGraphTreeComponentReference() {
    //     return this.graphReference;
    // }

    // getChartComponentReference() {
    //     return this.chartReference;
    // }

    // getGridView() {
    //     return (
    //         <div className="tablecontainer">
    //             <TableView ref='tableViewRef'
    //                 graphTreeComponentReference={this.getGraphTreeComponentReference.bind(this)}
    //                 chartComponentReference={this.getChartComponentReference.bind(this)}
    //                 subscriptionTopic={this.state.subscriptionTopic}
    //                 rowHeight={this.state.rowHeight} />
    //         </div>
    //     );
    // }

    // getGraphView() {
    //     return (
    //         // <div className="graphContainer">
    //         <DagreD3 ref="graphTree"
    //             reference={ref => this.graphReference = ref}
    //             objectBrowserComponentReference={this.getObjectBrowserComponentReference.bind(this)}
    //             chartComponentReference={this.getChartComponentReference.bind(this)}
    //             resizeEventHandler={(handler => { this.graphResizeEventHandler = handler }).bind(this)}
    //             qGraphData={{}} />
    //         // </div>
    //     )
    // }

    // getChartView() {
    //     return (
    //         <div className="chartContainer">
    //             <ChartHOC ref='chartHOC'
    //                 reference={ref => this.chartReference = ref}
    //                 resizeEventHandler={(handler => { this.chartResizeEventHandler = handler }).bind(this)}
    //             />
    //         </div>
    //     )
    // }

    // getObjectBrowserView() {
    //     return (
    //         <div className="objectBrowserContainer">
    //             <ObjectBrowser ref="objectBrowser"
    //                 reference={ref => this.objectBrowserReference = ref}
    //             />
    //         </div>
    //     )
    // }


    // factory(node) {
    //     var component = node.getComponent();
    //     node.setEventListener('visibility', p => console.log('visibility event handler', p))
    //     let view;
    //     switch (component) {
    //         case 'blotter':
    //             view = this.getGridView();
    //             break;

    //         case 'graph':
    //             view = this.getGraphView();
    //             node.setEventListener('resize', (p => {
    //                 if (this.graphResizeEventHandler)
    //                     this.graphResizeEventHandler(p);
    //                 console.log('resize Chart');
    //             }).bind(this))
    //             break;

    //         case 'chart':
    //             view = this.getChartView();
    //             node.setEventListener('resize', (p => {
    //                 if (this.chartResizeEventHandler)
    //                     this.chartResizeEventHandler(p);
    //                 console.log('resize Chart');
    //             }).bind(this))
    //             break;

    //         case 'objectbrowser':
    //             view = this.getObjectBrowserView();
    //             break;

    //         default:
    //             console.log('invalid view type');
    //             view = (<div />)
    //     }
    //     return view;
    // }

    render() {
        return (
            // <FlexLayout.Layout model={this.state.model} factory={this.factory.bind(this)} />
            <div>
            </div>
        )
    }

}

class ExampleComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subscriptionTopic: this.props.subscriptionTopic
        }
        // this.subscriptionTopic = this.props.subscriptionTopic;
    }

    render() {
        return <div style={{color:'white'}}>
            {this.state.subscriptionTopic}
        </div>
    }
}

export default App;