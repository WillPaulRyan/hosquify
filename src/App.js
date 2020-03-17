import React from 'react';
import Form from './components/Form'
import Card from './components/Card'
import Track from './components/Track'
import './App.css';

export default class App extends React.Component {
  state = {
    search: '',
    data: {},
    resultsLoaded: false,
    trackView: false,
    trackSelected: 0,
    currentSong: '',
    sortLength: false,
    sortGenre: false,
    sortPrice: false,
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
    this.setState({resultsLoaded: false, trackView: false})
    await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(this.state.search)}&media=music`)
      .then(res => {return res.json()})
      .then(data => {
        this.setState({
          data,
          resultsLoaded: true,
          sortLength: false,
          sortGenre: false,
          sortPrice: false,
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({resultsLoaded: true, data: {}})
      });
  }
  
  sortData = (event) => {
    let data = this.state.data

    if (event.target.id === 'length') {
      data.results.sort((a, b) => {
        return a.trackTimeMillis - b.trackTimeMillis
      })
      this.setState({data, sortLength: true, sortGenre: false, sortPrice: false})
    } else if (event.target.id === "genre") {
      data.results.sort((a, b) => {
        return a.primaryGenreName.localeCompare(b.primaryGenreName)
      })
      this.setState({data, sortLength: false, sortGenre: true, sortPrice: false})
    } else if (event.target.id === "price") {
      data.results.sort((a, b) => {
        return a.trackPrice - b.trackPrice
      })
      this.setState({data, sortLength: false, sortGenre: false, sortPrice: true})
    }
  }

  reset() {
    this.setState({
      search: '',
      data: {},
      resultsLoaded: false,
      trackView: false,
      // trackSelected: 0,
      sortLength: false,
      sortGenre: false,
      sortPrice: false,  
    })
    
  }

  render() {
    let results;
    if (this.state.resultsLoaded) {
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
          <img onClick={this.reset.bind(this)} tabIndex="1" src="./logo_simple.png" alt="Hosquify logo" />
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
          : <section id="results-container">
              {this.state.resultsLoaded 
                ? <div id="sort-results" >
                    {this.state.data.resultCount
                      ? <div id="sort-container">
                          <h3 id="sort-label">Sort by...</h3>
                          <div id="sort-capsule">
                            <div id="length" className={this.state.sortLength ? 'active' : ''} onClick={this.sortData.bind(this)}>Length</div>
                            <div id="genre" className={this.state.sortGenre ? 'active' : ''} onClick={this.sortData.bind(this)}>Genre</div>
                            <div id="price" className={this.state.sortPrice ? 'active' : ''} onClick={this.sortData.bind(this)}>Price</div>
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