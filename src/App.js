import React, { Component } from 'react'
import axios from 'axios'
import './App.scss'

class App extends Component {
  state = {
    searchInput: '',
    finalSearch: '',
    results: null,
  }

  componentDidMount() {
    axios
      .get('https://api.covid19india.org/zones.json')
      .then((res) => {
        this.setState({
          results: res.data.zones,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { results } = this.state

    return (
      <div className="app">
        <div className="topbar">
          <div className="container">
            <div className="search-cont">
              <input
                placeholder="Search for a District..."
                type="text"
                className="search-input"
              />
              <span className="search-icon-cont">
                <img
                  src="https://img.icons8.com/android/15/000000/search.png"
                  alt="search-icon"
                  className="search-icon"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="main-data">
          <div className="container">
            {results === null ? (
              <div className="load-wrap">
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              results.map((item) => (
                <div className="dist">
                  <h3 className="name" style={{ background: `${item.zone}` }}>
                    {item.district}
                  </h3>
                  <div className="details">
                    <div className="sub-detail">
                      <span className="title">Zone:</span>
                      <b
                        className="val-hl"
                        style={{ background: `${item.zone}` }}
                      >
                        {item.zone}
                      </b>
                    </div>

                    <div className="sub-detail">
                      <span className="title">Code:</span>
                      <b className="val">{item.districtcode}</b>
                    </div>
                    <div className="sub-detail">
                      <span className="title">State:</span>
                      <b className="val">{item.state}</b>
                    </div>
                    <div className="sub-detail">
                      <span className="title">State Code:</span>
                      <b className="val">{item.statecode}</b>
                    </div>
                    <div className="sub-detail">
                      <span className="title">Last Updated:</span>
                      <b className="val">{item.lastupdated}</b>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
