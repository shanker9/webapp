import React, { Component } from 'react';
import Sortable from 'react-sortablejs';
import TableHeaderCell from './TableHeaderCell.jsx';
class ControlledSortableHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns,
            isGroupedView: props.isGroupedView
        }
        this.parentColumnSetter = props.columnReorderHandler;
    }

    componentWillReceiveProps(nextProps) {
        const { columns, isGroupedView } = { ...nextProps };
        this.setState({
            columns: columns,
            isGroupedView: isGroupedView
        });
    }

    listChangeHandler(order, sortable, evt) {
        console.log('order', order);
        let reorderedItemList = [];
        order.forEach((item, i) => {
            let itemInCurrentState = this.state.columns.find(val => val.columnkey === item);
            reorderedItemList.push(itemInCurrentState);
        })
        this.parentColumnSetter(reorderedItemList);
    }

    scrollEventHandler = () => {
        let headerNode = document.getElementById('scrollableHeaderDiv');
        let tableNode = document.getElementById('scrollableTableDiv');
        tableNode.scrollLeft = headerNode.scrollLeft;
    }

    getDraggableElements() {
        let list = this.state.columns.map((item, i) => <TableHeaderCell key={i} columndata={item} />)
        return list;
    }

    filteredElement(event) {
        console.log(event);
    }

    getHeaderRow() {
        return this.state.isGroupedView ? (
            <div id="scrollableHeaderDiv" className='headerDiv' onScroll={this.scrollEventHandler}>
                <table>
                    <thead>
                        <tr>
                            <th className='groupExpansionHeaderBox' />
                            <Sortable tag='th' className='sortableheadarrow'
                                onChange={this.listChangeHandler.bind(this)}>
                                {
                                    this.getDraggableElements()
                                }
                            </Sortable>
                        </tr>
                    </thead>
                </table>
            </div>
        ) :
            (
                <div id="scrollableHeaderDiv" className='headerDiv' onScroll={this.scrollEventHandler}>
                    <table>
                        <thead>
                            <tr id='headerRow'>
                            <Sortable tag='th' className='sortableheaderrow' onChange={this.listChangeHandler.bind(this)}>
                                {
                                    this.getDraggableElements()
                                }
                            </Sortable>
                            </tr>
                        </thead>
                    </table>
                </div>
            );
    }

    render() {
        return this.getHeaderRow();
    }
}

export default ControlledSortableHeader;