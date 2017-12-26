import React from 'react';
import TableController from '../../../Controllers/TableController.js';
import BlotterInfo from './BlotterInfo.jsx';
// import TableRow from './TableRow.jsx';
import TableHeaderCell from './TableHeaderCell.jsx';
import GridView from './GridView.jsx';
import ReactSimpleRange from 'react-simple-range';
import BlockUi from 'react-block-ui';
import TableHeader from './TableHeader.jsx'
import 'react-block-ui/style.css';

// var flag = false, skipcount = 0;
class TableView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gridDataSource: [],
            topDivHeight: 0,
            bottomDivHeight: 0,
            isGroupedView: false,
            blocking: false,
            loadingmessage: ''
        }
        this.controller = undefined;
        this.sliderValue = 15;
        this.lastScrollTop = 0;
        this.columns = [
            {
                columnkey: "counterparty",
                columnvalue: "Counterparty",
                properties: {
                    isNumericColumn: false,
                    groupingEnable: true,
                }
            },
            {
                columnkey: "name",
                columnvalue: "Name",
                properties: {
                    isNumericColumn: false,
                    groupingEnable: true,
                }
            },
            {
                columnkey: "receiveIndex",
                columnvalue: "ReceiveIndex",
                properties: {
                    isNumericColumn: false,
                    groupingEnable: true,
                }
            },
            {
                columnkey: "rho10bps",
                columnvalue: "Rho10bps",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "gamma1pct",
                columnvalue: "Gamma1pct",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "delta1pct",
                columnvalue: "Delta1pct",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "vega1pt",
                columnvalue: "Vega1pt",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "lastUpdated",
                columnvalue: "LastUpdated",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "receiveLeg",
                columnvalue: "ReceiveLeg",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "vertex",
                columnvalue: "Vertex",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "price",
                columnvalue: "Price",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "payLeg",
                columnvalue: "PayLeg",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "volatility",
                columnvalue: "Volatility",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "payCurrency",
                columnvalue: "PayCurrency",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "payDiscountCurve",
                columnvalue: "PayDiscountCurve",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "payFixedRate",
                columnvalue: "PayFixedRate",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "maturityDate",
                columnvalue: "MaturityDate",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "payNotional",
                columnvalue: "PayNotional",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "receiveDiscountCurve",
                columnvalue: "ReceiveDiscountCurve",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "receiveNotional",
                columnvalue: "ReceiveNotional",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "receiveCurrency",
                columnvalue: "ReceiveCurrency",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "receiveSpread",
                columnvalue: "ReceiveSpread",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "amerOrEuro",
                columnvalue: "AmerOrEuro",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "putOrCall",
                columnvalue: "PutOrCall",
                properties: {
                    isNumericColumn: false
                }
            },
            {
                columnkey: "contractSize",
                columnvalue: "ContractSize",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "strike",
                columnvalue: "Strike",
                properties: {
                    isNumericColumn: true
                }
            },
            {
                columnkey: "underlier",
                columnvalue: "Underlier",
                properties: {
                    isNumericColumn: false,
                    groupingEnable: true,
                }
            }
        ];

        this.subscriptionTopic = this.props.subscriptionTopic;

        this.updateDataGridWithDefaultView = this.updateDataGridWithDefaultView.bind(this);
        this.updateDataGridWithGroupedView = this.updateDataGridWithGroupedView.bind(this);
        this.loadDataGridWithGroupedView = this.loadDataGridWithGroupedView.bind(this);
        this.rowUpdate = this.rowUpdate.bind(this);
        this.aggRowUpdate = this.aggRowUpdate.bind(this);
        this.scrollEventHandler = this.scrollEventHandler.bind(this);
        this.makeDefaultSubscription = this.makeDefaultSubscription.bind(this);
        this.makeGroupSubscription = this.makeGroupSubscription.bind(this);
        this.updateAggregatedRowExpandStatus = this.updateAggregatedRowExpandStatus.bind(this);
    }

    componentDidMount() {
        this.controller = new TableController(this, this.subscriptionTopic);
        // this.makeDefaultSubscription();
        // this.makeGroupSubscription('name');
    }

    /*** EventHandler for scrolling of Tabledata ***/
    scrollEventHandler() {
        let headerNode = document.getElementById('scrollableHeaderDiv');
        let tableNode = document.getElementById('scrollableTableDiv');
        headerNode.scrollLeft = tableNode.scrollLeft;
        if (this.lastScrollTop !== tableNode.scrollTop) {
            if (this.state.isGroupedView) {
                this.lastScrollTop = tableNode.scrollTop;
                this.updateDataGridWithGroupedView();
            } else {
                this.lastScrollTop = tableNode.scrollTop;
                this.updateDataGridWithDefaultView();
            }
        }
    }

    /** NON-GROUPING METHODS**/

    makeDefaultSubscription() {
        // this.controller = new TableController(this, this.subscriptionTopic);
        let commandObject1 = {
            "topic": this.subscriptionTopic,
            "orderBy": "/product",
        }

        this.controller.ampsSubscribe(commandObject1);
    }

    loadDataGridWithDefaultView() {
        let gridDiv = document.getElementById('scrollableTableDiv');
        let startIndex = 0;
        let endIndex = startIndex + 50;
        gridDiv.scrollTop = 0;
        let { gridDataSource, topDivHeight, bottomDivHeight } = this.controller.getDefaultViewData(startIndex, endIndex, this.props.rowHeight);
        this.setState({
            gridDataSource: gridDataSource,
            topDivHeight: topDivHeight,
            bottomDivHeight: bottomDivHeight,
            isGroupedView: false
        });

        let viewableUpperLimit = Math.round(gridDiv.clientHeight / this.props.rowHeight);
        let lowerLimit = startIndex + 1;

        let upperLimit = viewableUpperLimit > gridDataSource.length ? startIndex + gridDataSource.length : startIndex + viewableUpperLimit;
        this.refs.blotterInfo.updateGroupedViewStateTo(false);
        this.refs.blotterInfo.updateRowViewInfo(lowerLimit, upperLimit, this.controller.getDatamapSize());
        if (this.state.blocking) {
            this.toggleBlockUI();
        }
    }

    updateDataGridWithDefaultView() {
        let gridDiv = document.getElementById('scrollableTableDiv');

        let startIndex = Math.round(gridDiv.scrollTop / this.props.rowHeight);
        let endIndex = startIndex + 50;
        let viewableUpperLimit = Math.round(gridDiv.clientHeight / this.props.rowHeight);
        let lowerLimit = startIndex + 1;

        let { gridDataSource, topDivHeight, bottomDivHeight } = this.controller.getDefaultViewData(startIndex, endIndex, this.props.rowHeight);
        this.setState({
            gridDataSource: gridDataSource,
            topDivHeight: topDivHeight,
            bottomDivHeight: bottomDivHeight,
        });

        let upperLimit = viewableUpperLimit > gridDataSource.length ? startIndex + gridDataSource.length : startIndex + viewableUpperLimit;
        this.refs.blotterInfo.updateRowViewInfo(lowerLimit, upperLimit, this.controller.getDatamapSize());
    }


    /** GROUPING METHODS  **/

    makeGroupSubscription(columnName) {
        this.controller.groupDataByColumnKey(columnName);
    }

    loadDataGridWithGroupedView() {
        let startIndex = 0;
        let endIndex = startIndex + 50;
        document.getElementById('scrollableTableDiv').scrollTop = 0;
        let { gridDataSource, topDivHeight, bottomDivHeight } = this.controller.getGroupedViewData(startIndex, endIndex, this.props.rowHeight, this.state.isGroupedView);
        this.setState({
            gridDataSource: gridDataSource,
            topDivHeight: topDivHeight,
            bottomDivHeight: bottomDivHeight,
            isGroupedView: true
        });
        this.refs.blotterInfo.updateGroupedViewStateTo(true);
        if (this.state.blocking) {
            this.toggleBlockUI();
        }
    }

    updateDataGridWithGroupedView() {
        let startIndex = Math.round(document.getElementById('scrollableTableDiv').scrollTop / this.props.rowHeight);
        let endIndex = startIndex + 50;
        this.setState(this.controller.getGroupedViewData(startIndex, endIndex, this.props.rowHeight, this.state.isGroupedView));
        if (this.state.blocking) {
            this.toggleBlockUI();
        }
    }

    clearGrouping() {
        this.toggleBlockUI('');
        /** Resetting temporal slider to default */
        // this.changeSliderValue(15);

        this.controller.clearGroupSubscriptions();
        this.controller.clearArray(this.controller.groupingColumnsByLevel);
        // this.loadDataGridWithDefaultView();
        this.makeDefaultSubscription();
        let columnDragToBar = this.refs.dragToBar;
        while (columnDragToBar.firstChild) {
            columnDragToBar.removeChild(columnDragToBar.firstChild);
        }
        columnDragToBar.appendChild(document.createTextNode("DRAG COLUMNS HERE TO START GROUPING"));
    }

    onColumnDrop(event) {
        if (event.dataTransfer.getData("groupingcolumndata")) {
            let columnData = JSON.parse(event.dataTransfer.getData("groupingcolumndata"));
            let columnIndexInGroupedList = this.controller.getGroupingColumnsArray().indexOf(columnData.cellId);

            if (columnIndexInGroupedList === -1) {
                if (this.refs.dragToBar.firstChild.nodeName === '#text') {
                    this.refs.dragToBar.removeChild(this.refs.dragToBar.firstChild);
                }
                let clonedColumnElement = document.getElementById(columnData.cellId).cloneNode(true);
                clonedColumnElement.style.color = "#1E0B06";
                clonedColumnElement.style.backgroundColor = "#e8e7e3";
                clonedColumnElement.style.boxSizing = "border-box";
                // clonedColumnElement.style.height = this.refs.dragToBar.offsetHeight + "px";
                this.refs.dragToBar.appendChild(clonedColumnElement);
                this.toggleBlockUI();
                this.makeGroupSubscription(columnData.cellId);
            }
        }
    }

    allowDrop(event) {
        if (!(event.dataTransfer.items.length > 0 && event.dataTransfer.items[0].type === 'groupingcolumndata')) {
            event.dataTransfer.dropEffect = 'none';
        }
        event.preventDefault();
    }

    selectionDataUpdateHandler(rowIndexValue, parentRowKey, event) {
        this.controller.updateRowSelectionData(rowIndexValue, parentRowKey, this.state.isGroupedView);
        this.updateGraphData(rowIndexValue, parentRowKey, this.state.isGroupedView);
    }

    /** ROW UPDATE HANDLER **/

    rowUpdate(data, selectState, rowReference) {
        let rowElem = this.refs.gridViewRef.refs['ref' + rowReference];
        if (rowElem !== undefined) {
            rowElem.triggerUpdate(data, selectState);
        }
    }

    aggRowUpdate(data, rowReference) {
        let rowElem = this.refs.gridViewRef.refs['ref' + rowReference];
        if (rowElem !== undefined) {
            rowElem.triggerUpdate(data);
        }
    }

    updateAggregatedRowExpandStatus(groupKey, expandStatus) {
        if (expandStatus === false) {
            this.toggleBlockUI();
        }
        this.controller.updateGroupExpansionStatus(groupKey);
    }


    /** GRAPH METHODS **/

    updateGraphData(rowIndexValue, parentRowKey, isGroupedView) {
        this.controller.fetchAndFormatGraphData(rowIndexValue, parentRowKey, isGroupedView, (updateData) => {
            this.props.graphTreeComponentReference().updateParentNodeData(updateData);
        });
    }

    updateGraphUIWithData(graphData) {
        this.props.graphTreeComponentReference().updateGraphData(graphData);
    }

    /** TEMPORAL METHODS **/

    sliderChangeHandler(e) {
        this.toggleBlockUI();
        console.dir(15 - e.value);
        this.changeSliderValue(e.value);
        this.controller.getDataAtBeforeMins(15 - e.value, this.state.isGroupedView);
    }

    changeSliderValue(value) {
        this.sliderValue = value;
    }

    getLivePrices() {
        this.changeSliderValue(15);
        // this.makeDefaultSubscription();
        this.controller.changeLiveDataStatus(true);
        this.makeGroupSubscription('name');
    }

    toggleBlockUI(loadingmessage) {
        this.setState({
            blocking: !this.state.blocking,
            loadingmessage: loadingmessage
        });
    }

    reorderColumns(){
        this.columns = this.columns.reverse();
        this.forceUpdate();
    }

    render() {
        return (
            <BlockUi tag="div" blocking={this.state.blocking} message={this.state.loadingmessage}>
            <TableHeader />
                <div className="blottercontainer">
                    <div style={{ display: 'flex', marginBottom: '3px' }}>
                        <div style={{ flex: 0.7 }}>
                            <div ref="dragToBar"
                                className="dragtobar"
                                onDragOver={this.allowDrop.bind(this)}
                                onDrop={this.onColumnDrop.bind(this)}>
                                DRAG COLUMNS HERE TO START GROUPING
                        </div>
                        </div>
                        <div className='temporalContainer'>
                            <div className="temporalUIblock">
                                <div className="temporalslider">
                                    <ReactSimpleRange
                                        disableTrack
                                        min={0}
                                        max={15}
                                        step={5}
                                        defaultValue={this.sliderValue}
                                        sliderSize={4}
                                        thumbSize={15}
                                        sliderColor="#61a9f9"
                                        trackColor="#307dd4"
                                        thumbColor="#307dd4"
                                        onChangeComplete={this.sliderChangeHandler.bind(this)} />
                                </div>
                                <button className="temporalButton" onClick={this.getLivePrices.bind(this)}> Live Prices </button>
                            </div>
                        </div>
                        <BlotterInfo ref="blotterInfo"
                            subscribedTopic={this.props.subscriptionTopic}
                            clearGrouping={this.clearGrouping.bind(this)}
                            reorderColumns={this.reorderColumns.bind(this)} />
                    </div>

                    <div className="gridContainerDiv">
                        {this.state.isGroupedView ?
                            <div id="scrollableHeaderDiv" className="headerDiv">
                                <table className="table">
                                    <thead className="tableHead">
                                        <tr className="tableHeaderRow">
                                            <th className='groupExpansionHeaderBox' />
                                            {this.columns.map((item, i) =>
                                                <TableHeaderCell
                                                    key={i}
                                                    groupingHandler={this.makeGroupSubscription}
                                                    cellKey={item.columnkey}
                                                    cellData={item.columnvalue}
                                                    cellProperties={item.properties} />
                                            )}
                                        </tr>
                                    </thead>
                                </table>
                            </div> :
                            <div id="scrollableHeaderDiv" className="headerDiv">
                                <table className="table">
                                    <thead className="tableHead">
                                        <tr className="tableHeaderRow">
                                            {this.columns.map((item, i) =>
                                                <TableHeaderCell
                                                    key={i}
                                                    groupingHandler={this.makeGroupSubscription}
                                                    cellKey={item.columnkey}
                                                    cellData={item.columnvalue}
                                                    cellProperties={item.properties} />
                                            )}
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        }
                        <div id="scrollableTableDiv" className="tableDiv" onScroll={this.scrollEventHandler}>
                            <GridView isGroupedView={this.state.isGroupedView}
                                ref='gridViewRef'
                                viewableData={this.state.gridDataSource}
                                topDivHeight={this.state.topDivHeight}
                                bottomDivHeight={this.state.bottomDivHeight}
                                columnKeyValues={this.columns}
                                selectionDataUpdateHandler={this.selectionDataUpdateHandler.bind(this)}
                                dataUpdateStatus={this.props.rowDataUpdateStatus}
                                updateAggregatedRowExpandStatus={this.updateAggregatedRowExpandStatus} />
                        </div>
                    </div>
                </div>
            </BlockUi>
        );
    }
}


export default TableView;