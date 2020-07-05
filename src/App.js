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
    showDefaultResults: false,
    defaultResults: {
      Mumbai: true,
      Chennai: true,
      Kolkata: true,
      Pune: true,
    },
  }

  componentDidMount() {
    this.getFreshData()
  }

  getFreshData = () => {
    this.setState({
      data: null,
    })
    axios
      .get('https://api.covid19india.org/zones.json')
      .then((res) => {
        this.setState({
          data: res.data.zones,
        })
      })
      .catch((err) => console.log(err))
  }

  changeDefaultResultsShowcase = (val) => {
    this.setState({
      showDefaultResults: val,
    })
  }

  onSearchInputChange = (e) => {
    const { data } = this.state

    if (data) {
      this.setState({
        searchInput: e.target.value,
        finalSearch: false,
        showDefaultResults: false,
      })
    }
  }

  onResultClick = (val) => {
    this.setState({
      searchInput: val,
      finalSearch: true,
    })
  }

  onBlurInput = (e) => {
    setTimeout(() => {
      this.setState({ showDefaultResults: false })
    }, 100)
  }

  filterData = () => {
    const { data, searchInput } = this.state
    this.setState({
      data: null,
    })
    let newData = data.filter(
      (item) => item.district.toString() === searchInput.toString()
    )
    this.setState({
      data: newData,
    })
  }

  getResults = () => {
    const { data, searchInput } = this.state
    if (searchInput.length) {
      let newResults = data.filter((item) =>
        item.district.toLowerCase().includes(searchInput.toLowerCase())
      )

      newResults = newResults.filter((item, idx) => idx <= 5)
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
    if (prevState.finalSearch !== this.state.finalSearch) {
      if (this.state.finalSearch) {
        this.filterData()
      } else {
        this.getFreshData()
      }
    }
  }

  onResetClick = () => {
    this.setState({
      searchInput: '',
      finalSearch: false,
      results: [],
      showDefaultResults: false,
    })
    this.getFreshData()
  }

  render() {
    const {
      searchInput,
      finalSearch,
      data,
      results,
      showDefaultResults,
      defaultResults,
    } = this.state

    return (
      <div className="app">
        <Topbar
          searchInput={searchInput}
          onSearchInputChange={this.onSearchInputChange}
          results={results}
          finalSearch={finalSearch}
          onResultClick={this.onResultClick}
          data={data}
          showDefaultResults={showDefaultResults}
          defaultResults={defaultResults}
          changeDefaultResultsShowcase={this.changeDefaultResultsShowcase}
          onBlurInput={this.onBlurInput}
        />
        {data ? (
          <div className="showcase-info">
            <div className="container">
              <h2 className="main">
                Showing {data.length > 1 ? "Results" : "Result"} for{' '}
                {data.length > 1 ? (
                  <span className="show-hl"> "All Districts" </span>
                ) : (
                  <span className="show-hl"> "{data[0].district}" </span>
                )}
              </h2>
            </div>
          </div>
        ) : null}
        <div className="main-data">
          <div className="container">
            {data === null ? (
              <MainLoader />
            ) : (
              data.map((item, idx) => <District key={idx} item={item} />)
            )}
          </div>
        </div>
        {finalSearch ? (
          <div className="reset">
            <button onClick={this.onResetClick} className="reset-btn">
              Reset
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
