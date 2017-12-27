import React, { Component } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

class SortableComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: this.props.columns,
        }
        this.isGroupedView = props.isGroupedView;
        this.parentColumnSetter = props.columnReorderHandler;
    }

    componentWillUpdate(nextProps, nextState) {
        let newProps = { ...nextProps };
        this.isGroupedView = newProps.isGroupedView;
    }

    SortableItem = SortableElement(({ value }) => {
        return (
            <th className='th'>
                <div className='cellDiv'>{value.columnvalue}</div>
            </th>
        )
    });

    scrollEventHandler = () => {
        let headerNode = document.getElementById('scrollableHeaderDiv');
        let tableNode = document.getElementById('scrollableTableDiv');
        tableNode.scrollLeft = headerNode.scrollLeft;
    }

    SortableList = SortableContainer(({ items }) => {
        return this.isGroupedView ?
            (
                <div id="scrollableHeaderDiv" className='headerDiv' onScroll={this.scrollEventHandler}>
                    <table>
                        <thead>
                            <tr className='tableHeaderRow'>
                                <th className='groupExpansionHeaderBox' />
                                {items.map((value, index) => (
                                    <this.SortableItem key={`item-${index}`} index={index} value={value} />
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
            ) :
            (
                <div id="scrollableHeaderDiv" className='headerDiv' onScroll={this.scrollEventHandler}>
                    <table>
                        <thead>
                            <tr className='tableHeaderRow'>
                                {items.map((value, index) => (
                                    <this.SortableItem key={`item-${index}`} index={index} value={value} />
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
            )
    });

    onSortStart = ({ node, index, collection }, event) => {
        console.log('sort started..');
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.parentColumnSetter(arrayMove(this.state.columns, oldIndex, newIndex));
        this.setState({
            columns: arrayMove(this.state.columns, oldIndex, newIndex),
        });
    };

    render() {
        return <this.SortableList axis='x' items={this.state.columns} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} />;
    }
}



export default SortableComponent;

