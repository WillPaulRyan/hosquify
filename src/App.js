import React from 'react';
import Form from './components/Form'
import Card from './components/Card'
import Track from './components/Track'
import './App.css';

export default class App extends React.Component {
  state = {
    search: '',
    data: {},
    isLoaded: false,
    trackView: false,
    trackSelected: 0,
    currentSong: '',
  }

  audioControls = (event) => {
    // console.log(event)
    let button = event.target.id || event.target.parentElement.id
    // console.log(button)
    const audio = document.getElementById("audio");
    
    if (button === "play") {
      let song = this.state.data.results[this.state.trackSelected].previewUrl; 
      this.setState({
        currentSong: song,
      })
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
        .then()
        .catch(err => console.error(err))
      } else {playPromise()}
    } else if (button === "previous") {
      let current = this.state.trackSelected;
      if (current) {
        this.setState({trackSelected: current - 1})
      }
    } else if (button === "next") {
      let current = this.state.trackSelected;
      if (current < this.state.data.resultCount - 1) {
        this.setState({trackSelected: current + 1})
      }
    } else if (button === "pause") {audio.pause()}

  }

  handleBack = () => {
    this.setState({trackView: false})
  }

  handleChange = (event) => {
    this.setState({search: event.target.value})
  }
  
  handleKeyPress = (event) => {
    if(event.which === 13 || event.keyCode === 13) {
      if (!this.state.search) {
        this.setState({
          data: {resultCount: 0},
        });
        return;
      }
      this.search();
    }
  }
  
  handleKeyPressAudio = (event) => {
    if(event.which === 13 || event.keyCode === 13) {
      this.audioControls(event);
    }
  }


  handleSelect = (index) => {
    // console.log(this.state.data.results[index]);
    this.setState({trackView: true, trackSelected: index})
  }

  async search() {
    this.setState({isLoaded: false, trackView: false})
    await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(this.state.search)}&media=music`)
      .then(res => {return res.json()})
      .then(data => {
        this.setState({
          data,
          isLoaded: true,
        })
      })
      .catch(err => console.error(err));
  }
  
  render() {
    let results;
    if (this.state.isLoaded) {
      if (!this.state.data.resultCount) {
        results = <h2 id="no-results" >No results</h2>
      } else {
        results = this.state.data.results.map((result, index) => {
          return(<Card data={result} key={index} listId={index} handleClick={this.handleSelect.bind(null, index)} />)
        })
      }
    }

    return (
      <div id="app">
        <audio id="audio" src={this.state.currentSong} 
          crossOrigin="anonymous" preload="true" autoPlay />
        <section id="search-container">
          <a href="/" tabIndex="1"><img src="./logo_simple.png" alt="Hosquify logo" /></a>
          <Form 
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            search={this.state.search}
          />
        </section>
        {this.state.trackView
          ? <Track
              data={this.state.data.results[this.state.trackSelected]}
              handleBack={this.handleBack}
              audioControls={this.audioControls}
              handleKeyPressAudio={this.handleKeyPressAudio}
            />
          : <section id="results-container">{this.state.isLoaded ? results : ''}</section>
        }
      </div>
    );
  }
}