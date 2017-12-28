import React, { Component } from 'react';
import Sortable from 'sortablejs';

class SortableHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns,
        }
        this.isGroupedView = props.isGroupedView;
        this.parentColumnSetter = props.columnReorderHandler;
    }

    componentDidMount() {
        let headerRow = document.getElementById('sortableList');
        Sortable.create(headerRow, {
            animation: 300,
            onSort: this.onListChange.bind(this)
        });
    }

    componentDidUpdate() {
        let headerRow = document.getElementById('sortableList');
        Sortable.create(headerRow, {
            animation: 300,
            onSort: this.onListChange.bind(this)
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: nextProps.columns
        });
    }

    componentWillUpdate(nextProps, nextState) {
        let newProps = { ...nextProps };
        this.isGroupedView = newProps.isGroupedView;
    }

    onSortEnd = (event) => {
        console.log('Sort end event', event);
        this.sortedArray();
    }

    onListChange = (event) => {
        console.log('Sort list changed', event);
        let itemOldIndex, itemNewIndex;
        itemOldIndex = event.oldIndex;
        itemNewIndex = event.newIndex;
        const currentStateCopy = { ...this.state };
        let columnsDataCopy = currentStateCopy.columns;

        //Swapping the indexed items as per the event data
        let firstpart = columnsDataCopy.slice(0, itemOldIndex + 1);
        let secondpart = columnsDataCopy.slice(itemOldIndex + 1);
        let moveditem = firstpart.pop();
        columnsDataCopy = firstpart.concat(secondpart);
        columnsDataCopy.splice(itemNewIndex, 0, moveditem);
        this.parentColumnSetter(columnsDataCopy);
    }

    getDraggableElements() {
        let list = this.state.columns.map((item, i) => {
            return (
                <th key={i} className='th' >
                    <div className='cellDiv'>{item.columnvalue}</div>
                </th>
            )
        })
        return list;
    }

    scrollEventHandler = () => {
        let headerNode = document.getElementById('scrollableHeaderDiv');
        let tableNode = document.getElementById('scrollableTableDiv');
        tableNode.scrollLeft = headerNode.scrollLeft;
    }

    getHeaderRow = (() => {
        return this.isGroupedView ? (
            <div id="scrollableHeaderDiv" className='headerDiv' onScroll={this.scrollEventHandler}>
                <table>
                    <thead>
                        <tr id='headerRow' className='tableHeaderRow'>
                            <th className='groupExpansionHeaderBox' />
                            <div id='sortableList'>
                                {
                                    this.getDraggableElements()
                                }
                            </div>
                        </tr>
                    </thead>
                </table>
            </div>
        ) :
            (
                <div id="scrollableHeaderDiv" className='headerDiv' onScroll={this.scrollEventHandler}>
                    <table>
                        <thead>
                            <tr id='headerRow' className='tableHeaderRow'>
                                <div id='sortableList'>
                                    {
                                        this.getDraggableElements()
                                    }
                                </div>
                            </tr>
                        </thead>
                    </table>
                </div>
            );
    }).bind(this);

    render() {
        return this.getHeaderRow();
    }
}

export default SortableHeader;