/* eslint-disable react/style-prop-object */
import React from "react";
export class MainMatchUser extends React.Component {
    render() {

      return (
        <div className="col-md">
        <div className="card">
        <img src={this.props.avatar}
        className="card-img-top" alt="Couldn't load"></img>
            <div className="card-body">
                <h5 className="card-title">{this.props.name}<br></br>{this.props.title}</h5>
                <p className="card-text">Account Status <b>{this.props.status}</b></p>
                <p className="card-text">Level <b>{this.props.level}</b></p>
                <p className="card-text">Wins <b>{this.props.winrate}</b> of their Matches</p>
                <p className="card-text">Played <b>{this.props.playtime}</b> Hours</p>
                <p className="card-text">Region <b>{this.props.region}</b></p>
            </div>
        </div>
    </div>
      )
    }
  }