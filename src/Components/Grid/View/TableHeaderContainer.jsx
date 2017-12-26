import React, { Component } from 'react';


class TableHeaderContainer extends Component {

    constructor() {
        super();

        this.state = {
            datasource: ['Apple', 'Mango', 'grape'],
            displayDirection: 'horizontal'
        }
    }

    dragStartHandler(event) {
        console.log('dragstarted');
        let parent = document.getElementById('headercontainer');
        // let childNodes = parent.ge
    }

    onDragOverStartHandler(event) {
        console.log('dragOver on Object',event);
        let parent = document.getElementById('headercontainer');
        this.backup = event.target;
        let arrayFormat = Array.from(parent.childNodes);
        let serachElem = arrayFormat.find((item=>
            item.id === this.backup.id
        ).bind(this))
    }

    onDragOverHandler(event) {
        console.log('dragOver on Object',event);        
        event.preventDefault();
    }

    onDropHandler(event) {
        console.log('dropped');

    }

    getPlaceholderElement(){
        return (<div style={{height:'40px',width:'150px',backgroundColor:'lightgreen'}}></div>)
    }

    render() {
        return (
            <div id='headercontainer' style={{ backgroundColor: 'yellow', height: '300px', display: 'flex', flexDirection: this.state.displayDirection }}>
                {this.state.datasource.map((item, i) => (
                    <div
                        key={i}
                        style={{ backgroundColor: 'blue', height: '40px', width: '150px', marginRight: '5px' }}
                        draggable='true'
                        onDragOver={this.dragStartHandler.bind(this)}
                        onDragEnter={this.onDragOverStartHandler.bind(this)}
                        onDrop={this.onDropHandler.bind(this)}
                        id={i}
                    >{item}</div>
                ))}
            </div>);
    }
}

export default TableHeaderContainer;