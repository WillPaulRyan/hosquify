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
        <svg id="back"
          alt="Back"
          src="./back.svg"
          onClick={this.props.handleBack.bind(this)}
          onKeyPress={this.handleKeyPressBack}
          tabIndex="3"
          viewBox="0 0 219.151 219.151"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
              C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
              c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"/>
            <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
              c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
              c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
              c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"/>
          </g>
        </svg>
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
            <svg id="previous" className="previous" tabIndex="4" onClick={this.props.audioControls.bind(this)} onKeyPress={this.props.handleKeyPressAudio.bind(this)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="previous" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              <path className="previous" d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <svg id="play" className="play" tabIndex="5" onClick={this.props.audioControls.bind(this)} onKeyPress={this.props.handleKeyPressAudio.bind(this)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="play" d="M8 5v14l11-7z"/>
              <path className="play" d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <svg id="pause" className="pause" tabIndex="6" onClick={this.props.audioControls.bind(this)} onKeyPress={this.props.handleKeyPressAudio.bind(this)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="pause" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              <path className="pause" d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <svg id="next" className="next" tabIndex="7" onClick={this.props.audioControls.bind(this)} onKeyPress={this.props.handleKeyPressAudio.bind(this)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path className="next" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              <path className="next" d="M0 0h24v24H0z" fill="none"/>
            </svg>
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