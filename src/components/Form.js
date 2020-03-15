import React from 'react';
import './Form.css';

export default class Form extends React.Component {


  render() {
    return (
        <input id="search" type="text" 
          placeholder="Search..." autoComplete="off"
          onChange={this.props.handleChange.bind(this)}
          onKeyPress={this.props.handleKeyPress.bind(this)}
          value={this.props.search}
          tabIndex = '2'
        />
    );
  }
}