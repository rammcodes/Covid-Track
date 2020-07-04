import React, { Component } from 'react'

class Topbar extends Component {
  state = {}
  render() {
    const {
      searchInput,
      onSearchInputChange,
      results,
      finalSearch,
      onResultClick,
    } = this.props
    return (
      <div className="topbar">
        <div className="container">
          <div className="search-cont">
            <div className="main">
              <input
                placeholder="Search for a District..."
                type="text"
                className="search-input"
                value={searchInput}
                onChange={onSearchInputChange}
              />
              <span className="search-icon-cont">
                <img
                  src="https://img.icons8.com/android/15/000000/search.png"
                  alt="search-icon"
                  className="search-icon"
                />
              </span>
            </div>
            {finalSearch ? null : results.length ? (
              <div className="results">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="result"
                    onClick={() => onResultClick(item.district)}
                  >
                    <span className="name">
                      {/* {item.district.replace(
                        searchInput.toLowerCase(),
                        `<span className="bl-txt">${searchInput}</span>`
                      )} */}
                      {item.district.replace(
                        /Pu/g,
                        "<span class='bl-txt'>Pu</span>"
                      )}
                    </span>
                    <span
                      className="zone"
                      style={{ background: `${item.zone}` }}
                    >
                      {item.zone}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Topbar
