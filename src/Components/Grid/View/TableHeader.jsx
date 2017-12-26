import React, { Component } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

// class SortableComponent extends Component {
//     constructor() {
//         super();
//         this.state = {
//             items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
//         };

//         this.getListItems = this.getListItems.bind(this);
//     }


//     getListItems() {
//         let items = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11'];
//         let listItems = items.map((item, i) =>
//             <Pane id={i} key={i} width={120} height="50%">
//                 <div style={{ border: '1px solid black' }}>{item}</div>
//             </Pane>
//         )
//         return listItems;
//     }

//     SortableElement({ value }) {
//         return (<li>{value}</li>);
//     }

//     SortableContainer({ items }) {
//         let SortableItem = this.SortableElement.bind(this);
//         return (
//             <ul>
//                 {items.map((value, index) => (
//                     <SortableItem key={`item-${index}`} index={index} value={value} />
//                 ))}
//             </ul>
//         );
//     };

//     onSortEnd({ oldIndex, newIndex }) {
//         this.setState({
//             items: arrayMove(this.state.items, oldIndex, newIndex),
//         });
//     };

//     render() {
//         let SortableList = this.SortableContainer.bind(this);
//         return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
//     }
// };

const SortableItem = SortableElement(({ value }) =>
    <li>{value}</li>
);

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});

class SortableComponent extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
}



export default SortableComponent;

