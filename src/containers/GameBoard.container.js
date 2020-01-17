import React from 'react'
import { connect } from 'react-redux'
import GameBoard from '../components/GameBoard/GameBoard'
import PropTypes from 'prop-types'

import mapLegend from '../config/mapLegend'

import { fetchGame, startGame, tmpScore } from '../actions/gameActions'

const bounds = [[0, 0], [3330, 3825]]

class GameBoardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openedStartGameModal: true,
      iaeImplemented: [],
      circleIaeImplemented: [],
      iaeGroupSelected: 0,
      iaeTypeSelected: 0,
      actionSelected: -1
    }
    this.mapRef = React.createRef()
    this.onStartGame = this.onStartGame.bind(this)
    this.onCreatedIAE = this.onCreatedIAE.bind(this)
    this.onChangeIAEType = this.onChangeIAEType.bind(this)
    this.onChangeAction = this.onChangeAction.bind(this)
  }

  componentDidMount () {
    this.mapRef.current.leafletElement.fitBounds(bounds)

    const idGame = this.props.match.params.idGame

    this.props.fetchGame(idGame)
  }

  onStartGame () {
    const idGame = this.props.match.params.idGame

    this.props.startGame(idGame)
  }

  onCreatedIAE (e) {
    if (e.layerType === 'circlemarker') {
      const newIAE = {
        IAEGroup: this.state.iaeGroupSelected,
        IAEType: this.state.iaeTypeSelected,
        center: e.layer._latlng,
        unity: 1
      }

      this.setState({
        circleIaeImplemented: this.state.circleIaeImplemented.concat(newIAE)
      })
      this.updateScore(newIAE)
    } else {
      const newIAE = {
        IAEGroup: this.state.iaeGroupSelected,
        IAEType: this.state.iaeTypeSelected,
        coords: e.layer._latlngs,
        unity: this.calculNbUnite(e.layer._latlngs)
      }

      this.setState({
        iaeImplemented: this.state.iaeImplemented.concat(newIAE)
      })
      this.updateScore(newIAE)
    }
  }

  updateScore (newIAE) {
    const nbUnite = newIAE.unity

    const envPerUnit = mapLegend[newIAE.IAEGroup].environment
    const tempsTravailPerUnit = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].workingTime
    const productionPerUnit = mapLegend[newIAE.IAEGroup].iaeList[newIAE.IAEType].production

    const newProduction = Math.round((this.props.game.production + (nbUnite * productionPerUnit)) * 10) / 10
    const newTempsTravail = Math.round((this.props.game.tempsTravail + (nbUnite * tempsTravailPerUnit)) * 10) / 10
    const newEnv = Math.round((this.props.game.environnement + (nbUnite * envPerUnit)) * 10) / 10

    this.props.tmpScore(newProduction, newEnv, this.props.game.ancrageSocial, newTempsTravail)
  }

  calculNbUnite (iaeCoords) {
    if (iaeCoords.length === 2) {
      const unity = (this.mapRef.current.leafletElement.distance(iaeCoords[0], iaeCoords[1]) / 150)
      return Math.round(unity * 10) / 10
    }
  }

  onChangeIAEType = (group, type) => {
    this.setState({
      iaeGroupSelected: group,
      iaeTypeSelected: type
    })
  }

  onChangeAction = (e, { value }) => {
    if (value === this.state.actionSelected) {
      // Uncheck action
      this.setState({ actionSelected: -1 })
    } else {
      // Check action
      this.setState({ actionSelected: value })
    }
  }

  render () {
    return (
      <GameBoard
        ref={this.mapRef}
        bounds={bounds}
        handleStartGame={this.onStartGame}
        opened={this.state.openedStartGameModal}
        handleIAETypeChange={this.onChangeIAEType}
        handleCreatedIAE={this.onCreatedIAE}
        iaeImplemented={this.state.iaeImplemented}
        circleIaeImplemented={this.state.circleIaeImplemented}
        iaeGroupSelected={this.state.iaeGroupSelected}
        iaeTypeSelected={this.state.iaeTypeSelected}
        actionSelected={this.state.actionSelected}
        handleOnChangeAction={this.onChangeAction}
      />
    )
  }
}

GameBoardContainer.propTypes = {
  game: PropTypes.object.isRequired,
  fetchGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  tmpScore: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  { fetchGame, startGame, tmpScore }
)(GameBoardContainer)
