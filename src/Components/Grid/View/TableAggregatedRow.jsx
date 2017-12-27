import React from 'react';
import TableCell from './TableCell.jsx';
import RowController from '../../../Controllers/RowController.js';

class TableAggregatedRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            columnData: props.columnData,
            expandStatus : props.selectState
        }

        this.controller = new RowController();

        this.dynamicBackgroundColor = undefined;
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
            columnData: nextProps.columnData,
            expandStatus : nextProps.selectState
        })
    }

    handleRowClick(e) {
        e.preventDefault();
        this.props.updateAggregatedRowExpandStatus(this.props.aggregatedRowKey,this.state.expandStatus);
    }

    triggerUpdate(newdata) {
        this.setState({ data: newdata })
    }

    render() {
        return (
            <tr ref={"tableRow"}
                className="tableRow"
                onClick={this.handleRowClick}
                style={{}}>
                <td className="tdGroupedView">{this.state.expandStatus?'-':'+'}</td>
                {
                    this.state.columnData.map((item, i) => {
                        return (
                            <TableCell key={i} parentBackgroundColor={this.dynamicBackgroundColor}
                                cellData={this.controller.getCellValueUsingColumnKeyFromData(item.columnkey, this.state.data)}
                                columnProperties={item.properties}></TableCell>
                        );
                    })
                }
            </tr>
        )
    }

}



export default TableAggregatedRow;