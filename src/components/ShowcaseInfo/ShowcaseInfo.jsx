import React, { Component } from 'react'

class ShowcaseInfo extends Component {
  state = {}
  render() {
    const { data } = this.props

    if (data === null) {
      return null
    }

    return (
      <div className="showcase-info">
        <div className="container">
          <h2 className="main">
            Showing {data.length > 1 ? 'Results' : 'Result'} for{' '}
            {data.length > 1 ? (
              <span className="show-hl"> "All Districts" </span>
            ) : (
              <span className="show-hl"> "{data[0].district}" </span>
            )}
          </h2>
        </div>
      </div>
    )
  }
}

export default ShowcaseInfo
