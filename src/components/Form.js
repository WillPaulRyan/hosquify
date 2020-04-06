import React from 'react';
import './Form.css';

export default class Form extends React.Component {
  handleKeyPress = (event) => {
    // Called when pressing 'enter' in search bar
    if(event.which === 13 || event.keyCode === 13) {
      this.props.search();
    }
  }

  render() {
    return (
        <input id="search" type="text" 
          placeholder="Search..." autoComplete="off"
          onChange={this.props.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress}
          value={this.props.searchValue}
        />
    );
  }
}