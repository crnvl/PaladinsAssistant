/* eslint-disable react/style-prop-object */
import React from "react";
export class MatchUser extends React.Component {
    render() {
      const ranking = [];
      if(this.props.mode === 'Ranked')
        ranking.push(<p className="card-text">Ranking <b>{this.props.ranking}</b></p>);

      const img = [];
      if(this.props.championUrl === undefined) {

      }
      if(this.props.championUrl !== null && this.props.championUrl.toString().includes('shalin'))
        img.push(<img src="./assets/champions/unknown.png"
          className="card-img-top" alt="Couldn't load"></img>)
      else if(this.props.championUrl === null)
        img.push(<img src="./assets/champions/unknown.png"
        className="card-img-top" alt="Couldn't load"></img>)
      else 
        img.push(<img src={this.props.championUrl}
        className="card-img-top" alt="Couldn't load"></img>)
      return (
        <div className="col-md">
        <div className="card">
            {img}
            <div className="card-body">
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">Level <b>{this.props.level}</b></p>
                <p className="card-text">Playing <b>{this.props.champion}</b><br></br>Skin: <b>{this.props.championSkin}</b><br></br>Champion Level <b>{this.props.championLevel}</b></p>
                <p className="card-text">Winrate <b>{this.props.winrate}</b></p>
                {ranking}
            </div>
        </div>
    </div>
      )
    }
  }