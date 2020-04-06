import React from 'react';
import Form from './components/Form'
import Card from './components/Card'
import Track from './components/Track'
import './App.css';

export default class App extends React.Component {
  state = {
    searchValue: '',
    data: {},
    resultsLoaded: false,
    trackView: false,
    trackSelected: 0,
    currentSong: '',
    sortParam: '',
  }

  audioControls = (event) => {
    let button = event.target.id
    // console.log(button)
    const audio = document.getElementById("audio");
    
    if (button === "play") {
      let song = this.state.data.results[this.state.trackSelected].previewUrl; 
      this.setState({
        currentSong: song,
      })
        
      // Promise that song will play, after it loads
      var playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then()
        // Throws an error on the first song of every session, 
        // but it's okay, so we don't log it
        .catch(error => {});
      }
    
    } else if (button === "previous") {
      let current = this.state.trackSelected;
      if (current) {
        this.setState({trackSelected: current - 1})
      } // else do nothing, because current == 0 and cannot be decreased

    } else if (button === "next") {
      let current = this.state.trackSelected;
      if (current < this.state.data.resultCount - 1) {
        this.setState({trackSelected: current + 1})
      } // else do nothing, because current is last song and cannot be increased 
    } else if (button === "pause") {audio.pause()}
  }

  handleBack = () => {
    // Called when hitting '<-' in track view
    this.setState({trackView: false})
  }

  handleChange = (event) => {
    // Called when typing in search bar
    this.setState({searchValue: event.target.value})
  }
    
  handleSelect = (index) => {
    // What track are we looking at?
    this.setState({trackView: true, trackSelected: index})
    // console.log(this.state.data.results[index]); // For testing API response
  }

  async search() {
    // Reset and fetch
    this.setState({resultsLoaded: false, trackView: false, resultCount: 0})
    await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(this.state.searchValue)}&media=music`)
      .then(res => {return res.json()})
      .then(data => {
        this.setState({
          data,
          resultsLoaded: true,
          sortParam: '',
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({resultsLoaded: true, data: {}})
      });
  }
  
  sortData = (event) => {
    let data = this.state.data;

    if (event.target.id === 'length') {
      if (this.state.sortParam === 'length') {
        // Reverse if already sorted by length
        data.results.reverse();
      } else {
        // Sort ascending
        data.results.sort((a, b) => {
          return a.trackTimeMillis - b.trackTimeMillis
        })
      }
      this.setState({data, sortParam: 'length'})

    } else if (event.target.id === "genre") {
      if (this.state.sortParam === 'genre') {
        // Reverse if already sorted by genre
        data.results.reverse();
      } else {
        // Sort desending
        data.results.sort((a, b) => {
          return a.primaryGenreName.localeCompare(b.primaryGenreName)
        })
      }
      this.setState({data, sortParam: 'genre'})

    } else if (event.target.id === "price") {
      if (this.state.sortParam === 'price') {
        // Reverse if already sorted by price
        data.results.reverse();
      } else {
        // Sort ascending
        data.results.sort((a, b) => {
          return a.trackPrice - b.trackPrice
        })
      }
      this.setState({data, sortParam: 'price'})
    }
  }

  reset() {
    this.setState({
      searchValue: '',
      data: {},
      resultsLoaded: false,
      trackView: false,
      sortLength: false,
      sortGenre: false,
      sortPrice: false,  
    })
    
  }

  render() {
    let results;
    // Array.map() data from API
    if (this.state.resultsLoaded) {
      if (!this.state.data.resultCount) {
        results = <h2 id="no-results">No results</h2>
      } else {
        results = this.state.data.results.map((result, index) => {
          return(<Card data={result} key={index} listId={index} handleClick={this.handleSelect.bind(null, index)} />)
        })
      }
    }

    return (
      <div id="app">
        {/* Hidden audio player */}
        <audio id="audio" src={this.state.currentSong} 
          crossOrigin="anonymous" preload="true" autoPlay />
        
        <section id="search-container">
          <button id="logo" onClick={this.reset.bind(this)}></button>
          <Form 
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
            searchValue={this.state.searchValue}
            search={this.search.bind(this)}
          />
        </section>

        {/* Either display track view or search view */}
        {this.state.trackView
          ? <Track
              data={this.state.data.results[this.state.trackSelected]}
              handleBack={this.handleBack}
              audioControls={this.audioControls}
              handleKeyPressAudio={this.handleKeyPressAudio}
            />
          : <section id="results-container">
              {/* If we have results, display them */}
              {this.state.resultsLoaded 
                ? <div id="sort-results" >
                    {this.state.data.resultCount
                      ? <div id="sort-container">
                          {/* This could be its own separate component... */}
                          <h3 id="sort-label">Sort by...</h3>
                          <div id="sort-capsule">
                            <button id="length" className={this.state.sortParam === 'length' ? 'active' : ''} onClick={this.sortData.bind(this)}>Length</button>
                            <button id="genre" className={this.state.sortParam === 'genre' ? 'active' : ''} onClick={this.sortData.bind(this)}>Genre</button>
                            <button id="price" className={this.state.sortParam === 'price' ? 'active' : ''} onClick={this.sortData.bind(this)}>Price</button>
                          </div>
                        </div>
                      : ''
                    }
                    <div id="results">{results}</div>
                  </div>
                : ''}
            </section>
        }
      </div>
    );
  }
}