import React from 'react';
import './Card.css'

export default class App extends React.Component {

  handleKeyPress = (event) => {
    if(event.which === 13 || event.keyCode === 13) {
      this.props.handleClick();
    }
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  
  render() {    
    return(
      <div className="card" tabIndex={this.props.listId + 3} onClick={this.props.handleClick} onKeyPress={this.handleKeyPress} >
        <div className="thumb-container" style={{backgroundImage: `url(${this.props.data.artworkUrl100})`}}>
          <span className="length">{this.millisToMinutesAndSeconds(this.props.data.trackTimeMillis)}</span>
        </div>
        <div className="info">
          <div className="primary">
            <h3 className="title">{this.props.data.trackName}</h3>
            <h3 className="artist">{this.props.data.artistName}</h3>
          </div>
          <h4 className="album">{this.props.data.collectionName}</h4>
          <h4 className="year">{this.props.data.releaseDate.substring(0,4)} - {this.props.data.primaryGenreName}</h4>
          {this.props.data.trackPrice > 0
          ? <h4 className="price">${this.props.data.trackPrice}</h4>
          : <h4 className="price">Unavailable</h4>}
        </div>
      </div>
    )
  }

}