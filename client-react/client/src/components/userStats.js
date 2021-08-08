/* eslint-disable react/style-prop-object */
import React from "react";
export class MatchUser extends React.Component {
    render() {
      return (
        <div className="col-md">
        <div className="card">
            <img src={this.props.championUrl}
                className="card-img-top" alt="Couldn't load"></img>
            <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">Level <b>{this.props.level}</b></p>
                <p className="card-text">Playing <b>{this.props.champion}</b><br></br>Champion Level <b>{this.props.championLevel}</b></p>
                <p className="card-text">Winrate <b>{this.props.winrate}</b></p>
                <p className="card-text">Ranking <b>{this.props.ranking}</b></p>
            </div>
        </div>
    </div>
      )
    }
  }