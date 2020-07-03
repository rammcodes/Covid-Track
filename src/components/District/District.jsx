import React, { Component } from 'react'

class District extends Component {
  state = {}
  render() {
    const { item } = this.props

    return (
      <div className="dist">
        <h3 className="name" style={{ background: `${item.zone}` }}>
          {item.district}
        </h3>
        <div className="details">
          <div className="sub-detail">
            <span className="title">Zone:</span>
            <b className="val-hl" style={{ background: `${item.zone}` }}>
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
    )
  }
}

export default District
