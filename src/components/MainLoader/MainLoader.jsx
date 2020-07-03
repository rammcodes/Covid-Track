import React, { Component } from 'react'

class MainLoader extends Component {
  state = {}
  render() {
    return (
      <div className="load-wrap">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default MainLoader
