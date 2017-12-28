import React from 'react';

class TableHeaderCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            columndata: props.columndata
        }
    }

    componentWillReceiveProps(nextProps) {
        const {columndata} = { ...nextProps };
        this.setState({ 
            columndata : columndata
         });
    }

    dragStart(event) {
        const celldata = this.state.columndata;
        const isSelected = this.state.isSelected;
        if (this.state.columndata.properties.hasOwnProperty('groupingEnable')) {
            event.dataTransfer.setData("groupingcolumndata", JSON.stringify({ celldata: celldata, isSelected: isSelected, columnProperties: this.state.columnProperties }));
        }
    }

    render() {
        return (
            <th id={this.props.columndata.columnkey}
                data-id={this.props.columndata.columnkey}
                className="th"
                onClick={this.columnClickHandler}
                onDragStart={this.dragStart.bind(this)}>
                <div className='cellDiv'>{this.props.columndata.columnvalue}</div>
            </th>
        )
    }

}


export default TableHeaderCell;