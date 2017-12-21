import React, { Component } from 'react';
import JsonView from 'react-json-pretty';
// import styles from '../../../styles/AppStyles.css';
// require('react-json-pretty/JSONPretty.adventure_time.styl');
// require('react-json-pretty/JSONPretty.acai.styl');
// require('react-json-pretty/JSONPretty.1337.styl');
// require('react-json-pretty/JSONPretty.monikai.styl');
require('./custom-theme.styl');

class ObjectBrowser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }

        this.props.reference(this);                
    }

    updateData(vertextData) {
        this.setState({ data: vertextData });
    }

    render() {
        return (
            <div className="objectBrowser">
                <JsonView json={this.state.data} space="2" />
            </div>
        );
    }
}

ObjectBrowser.defaultProps = {
    data: {},
}

export default ObjectBrowser;