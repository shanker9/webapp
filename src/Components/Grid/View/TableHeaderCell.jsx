import React, { Component } from 'react';

class TableHeaderCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            columndata: props.columndata
        }
        this.columnsortinghandler = props.columnsortinghandler;
    }

    componentWillReceiveProps(nextProps) {
        const { columndata } = { ...nextProps };
        this.setState({
            columndata: columndata
        });
    }

    dragStart(event) {
        // event.preventDefault();
        if (event.target.id === this.state.columndata.columnkey) {
            const celldata = this.state.columndata;
            const isSelected = this.state.isSelected;
            if (this.state.columndata.properties.hasOwnProperty('groupingEnable')) {
                event.dataTransfer.setData("groupingcolumndata", JSON.stringify({ celldata: celldata, isSelected: isSelected, columnProperties: this.state.columnProperties }));
            }
        }
    }

    columnClickHandler(event) {
        if (this.state.columndata.properties.hasOwnProperty('isSortable') && this.state.columndata.properties.isSortable) {
            this.columnsortinghandler(this.state.columndata);
        } else {
            alert(`Sorting on column : ${this.state.columndata.columnvalue} is not supported`);
        }
    }

    render() {
        return (
            <th id={this.props.columndata.columnkey}
                data-id={this.props.columndata.columnkey}
                className="th"
                onClick={this.columnClickHandler.bind(this)}
                onDragStart={this.dragStart.bind(this)}>
                <div className='headercelldiv' style={{ display: 'flex' }}>
                    <div className='columnlabelbox' style={this.state.columndata.properties.isNumericColumn ? { textAlign: 'right', paddingRight: '10px' } : { textAlign: 'left', paddingLeft: '10px' }}>
                        {this.props.columndata.columnvalue}
                    </div>
                    <div className='my-handle'>::</div>
                </div>
            </th>
        )
    }

}


export default TableHeaderCell;