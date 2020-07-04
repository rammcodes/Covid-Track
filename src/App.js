import React, { Component } from 'react'
import axios from 'axios'
import District from './components/District/District'
import MainLoader from './components/MainLoader/MainLoader'
import Topbar from './components/Topbar/Topbar'
import './App.scss'

class App extends Component {
  state = {
    searchInput: '',
    finalSearch: false,
    data: null,
    results: [],
  }

  componentDidMount() {
    axios
      .get('https://api.covid19india.org/zones.json')
      .then((res) => {
        this.setState({
          data: res.data.zones,
        })
      })
      .catch((err) => console.log(err))
  }

  onSearchInputChange = (e) => {
    this.setState({ searchInput: e.target.value, finalSearch: false })
  }

  onResultClick = (val) => {
    this.setState({
      searchInput: val,
      finalSearch: true,
    })
  }

  getResults = () => {
    const { data, searchInput } = this.state
    if (searchInput.length) {
      let newResults = data.filter((item) =>
        item.district.toLowerCase().includes(searchInput.toLowerCase())
      )

      newResults = newResults.filter((item, idx) => idx <= 5)
      console.log(newResults, 'nr')
      this.setState({ results: newResults })
    } else {
      this.setState({
        results: [],
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchInput !== this.state.searchInput) {
      this.getResults()
    }
  }

  render() {
    const { searchInput, finalSearch, data, results } = this.state

    return (
      <div className="app">
        <Topbar
          searchInput={searchInput}
          onSearchInputChange={this.onSearchInputChange}
          results={results}
          finalSearch={finalSearch}
          onResultClick={this.onResultClick}
        />
        <div className="main-data">
          <div className="container">
            {data === null ? (
              <MainLoader />
            ) : (
              data.map((item, idx) => <District key={idx} item={item} />)
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
