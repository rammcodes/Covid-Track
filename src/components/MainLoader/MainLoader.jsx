import React, { Component } from 'react'
import './MainLoader.scss';

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
