import React from 'react';
// import styles from '../../../styles/AppStyles.css';

class TableHeaderCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            columnProperties: props.cellProperties
        }
        this.columnClickHandler = this.columnClickHandler.bind(this);
    }

    columnClickHandler() {
        // this.props.groupingHandler(this.props.cellKey, this.state.isSelected);
    }

    dragStart(event) {
        // console.log('Dragged Element: ',event.target);
        const cellId = this.props.cellKey;
        const isSelected = this.state.isSelected;
        if (this.state.columnProperties.groupingEnable) {
            event.dataTransfer.setData("groupingcolumndata", JSON.stringify({ cellId: cellId, isSelected: isSelected, columnProperties: this.state.columnProperties }));
        }
    }

    render() {

        return (
            <th id={this.props.cellKey}
                className="th"
                onClick={this.columnClickHandler}
                onDragStart={this.dragStart.bind(this)}
                draggable="true">
                <div className='cellDiv'>{this.props.cellData}</div>
            </th>
        )
    }

}


export default TableHeaderCell;