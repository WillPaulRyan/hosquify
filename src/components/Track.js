import React from 'react';
import './Track.css';

export default class Track extends React.Component {

  handleKeyPressBack = (event) => {
    if(event.which === 13 || event.keyCode === 13) {
      this.props.handleBack();
    }
  }

  render() {
    return(
      <section id="track-view">
        <button id="back" onClick={this.props.handleBack}></button>
        <div id="track-container">
          <div id="track-info">
            <img id="cover" src={this.props.data.artworkUrl100} alt="Album Cover" />
            <div id="primary">
              <h1 id="title">{this.props.data.trackName}</h1>
              <h2 id="artist">{this.props.data.artistName}</h2>
            </div>
            <h2 id="album">{this.props.data.collectionName}</h2>
            <h2 id="year">{this.props.data.releaseDate.substring(0,4)} - {this.props.data.primaryGenreName}</h2>
          </div>
          <div id="track-controls">
            <button id="previous" onClick={this.props.audioControls.bind(this)}></button>
            <button id="play" onClick={this.props.audioControls.bind(this)}></button>
            <button id="pause" onClick={this.props.audioControls.bind(this)}></button>
            <button id="next" onClick={this.props.audioControls.bind(this)}></button>
          </div>
          <div id="share">
            {/* Facebook (url) */}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=willpaulryan.github.io/hosquify`}
                className="share-btn facebook"
                target="_blank" rel="noopener noreferrer" >              
              Facebook
            </a>

            {/* Twitter (url, text, @mention) */}
            <a href={`https://twitter.com/share?url=willpaulryan.github.io/hosquify&text=Listening%20to%20${this.props.data.artistName}%20%2D%20${this.props.data.trackName}%20on%20Hosquify!`} 
                className="share-btn twitter"
                target="_blank" rel="noopener noreferrer" >
              Twitter
            </a>
            {/* LinkedIn (url, title, summary, source url) */}
            <a href={`https://www.linkedin.com/shareArticle?url=willpaulryan.github.io/hosquify&title=Hosquify&summary=Listening%20to%20${this.props.data.artistName}%20%2D%20${this.props.data.trackName}%20on%20Hosquify!&source=willpaulryan.github.io/hosquify`}
                className="share-btn linkedin"
                target="_blank" rel="noopener noreferrer" >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    )
  }
}