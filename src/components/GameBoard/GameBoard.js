import React from 'react'
import PropTypes from 'prop-types'
import 'leaflet-draw/dist/leaflet.draw.css'
import GameMap from './GameMap/GameMap'
import IAETypeSelect from './IAETypeSelect'
import StartGameModal from './StartGameModal'
import { connect } from 'react-redux'

import { Button, Divider, Grid, Image, Message, Modal, Segment } from 'semantic-ui-react'

import mapInfoLegend from '../../assets/mapLegend/mapInfoLegend.png'
import RuralisHeader from '../common/RuralisHeader'
import GameStepContainer from '../../containers/GameStep.container'
import scenarii from '../../config/scenarii'
import MessageErrorModal from './MessageErrorModal'
import EndGameModal from './GameSteps/EndGame/EndGameModal'
import eventCards from '../../config/eventCards'

const GameBoard = React.forwardRef((props, ref) => {
  const {
    game,
    bounds,
    handleCreatedIAE,
    iaeImplemented,
    iaeMarkerImplemented,
    clearAllIAEs,
    handleonChangeDeleting,
    handleDeleteIAE,
    handleValidateDeletingIAE,
    handleCancelDeletingIAE,
    removeMarkersIAEdeleted,
    iaeGroupSelected,
    iaeTypeSelected,
    handleIAETypeChange,
    actionSelected,
    handleOnChangeAction,
    clearIAEsimplemented,
    opened,
    handleStartGame,
    errorPrairie,
    errorScore,
    errorTypesIAE,
    errorMare,
    handleOnCloseError
  } = props

  const breadcrumbSections = [
    { key: game._id, content: game._id + '. ' + game.name, active: true, as: 'h3' }
  ]

  const scenarioInfos = scenarii.find(s => s.number === game.scenario)

  return (
    <div>
      <RuralisHeader breadcrumbSections={breadcrumbSections} />
      <Segment basic>

        {/* MODALS TO START THE GAME */}
        {
          game.numTour === 0 &&
            <StartGameModal
              opened={opened}
              handleStartGame={handleStartGame}
            />
        }

        <Grid columns={3} stackable textAlign='center'>

          <Grid.Column width={9}>
            <GameMap
              ref={ref}
              bounds={bounds}
              onCreatedIAE={handleCreatedIAE}
              iaeGroupSelected={iaeGroupSelected}
              iaeImplemented={iaeImplemented}
              iaeMarkerImplemented={iaeMarkerImplemented}
              clearAllIAEs={clearAllIAEs}
              handleDeleteIAE={handleDeleteIAE}
              handleonChangeDeleting={handleonChangeDeleting}
              handleValidateDeletingIAE={handleValidateDeletingIAE}
              handleCancelDeletingIAE={handleCancelDeletingIAE}
              removeMarkersIAEdeleted={removeMarkersIAEdeleted}
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <IAETypeSelect
              iaeGroupSelected={iaeGroupSelected}
              iaeTypeSelected={iaeTypeSelected}
              onIAETypeChange={handleIAETypeChange}
            />

            <Divider hidden />

            <Message color='yellow' header='OBJECTIF COMMUN' content={scenarioInfos && scenarioInfos.objectives} />

            <Modal
              size='large' closeIcon
              trigger={
                <Button
                  content='Cartes événement tirées' icon='eye'
                  style={{ backgroundColor: '#52255D', color: 'white' }}
                />
              }
            >
              <Modal.Content scrolling>
                <Image.Group size='medium'>
                  {
                    game.cardsPicked &&
                    game.cardsPicked.map(cardNumber =>
                      <Image key={cardNumber} src={eventCards.find(c => c.numCard === cardNumber).cardPicture} />)
                  }
                </Image.Group>
              </Modal.Content>
            </Modal>

            <Divider hidden />

            <Image src={mapInfoLegend} />
          </Grid.Column>

          <Grid.Column width={4}>
            <GameStepContainer
              iaeImplemented={iaeImplemented}
              iaeMarkerImplemented={iaeMarkerImplemented}
              clearIAEsimplemented={clearIAEsimplemented}
              actionSelected={actionSelected}
              onChangeAction={handleOnChangeAction}
            />
          </Grid.Column>

        </Grid>
      </Segment>

      {/* MODALS FOR MESSAGE ERROR */}
      <MessageErrorModal
        opened={errorPrairie} message='Vous ne pouvez pas implanter plus de 5 unités de prairies'
        handleOnClose={handleOnCloseError}
      />
      <MessageErrorModal
        opened={errorScore} message='Le temps de travail ne peut pas être inférieur à 0.'
        handleOnClose={handleOnCloseError}
      />
      <MessageErrorModal
        opened={errorTypesIAE}
        message={'Vous ne pouvez pas implanter 2 types d\'IAE différents durant le même tour.'}
        handleOnClose={handleOnCloseError}
      />
      <MessageErrorModal
        opened={errorMare} message='Vous ne pouvez pas implanter plus de 5 mares.'
        handleOnClose={handleOnCloseError}
      />

      {/* MODALS WHEN THE GAME IS ENDED */}
      <EndGameModal opened={game.ended} idGame={game._id} />

    </div>
  )
})

GameBoard.propTypes = {
  game: PropTypes.object.isRequired,
  // GameMap
  bounds: PropTypes.array.isRequired,
  handleCreatedIAE: PropTypes.func.isRequired,
  iaeImplemented: PropTypes.array.isRequired,
  iaeMarkerImplemented: PropTypes.array.isRequired,
  clearAllIAEs: PropTypes.func.isRequired,
  handleonChangeDeleting: PropTypes.func.isRequired,
  handleDeleteIAE: PropTypes.func.isRequired,
  handleValidateDeletingIAE: PropTypes.func.isRequired,
  handleCancelDeletingIAE: PropTypes.func.isRequired,
  removeMarkersIAEdeleted: PropTypes.func.isRequired,
  // IAE Type Select
  iaeGroupSelected: PropTypes.number.isRequired,
  iaeTypeSelected: PropTypes.number.isRequired,
  handleIAETypeChange: PropTypes.func.isRequired,
  // Game Step
  actionSelected: PropTypes.number.isRequired,
  handleOnChangeAction: PropTypes.func.isRequired,
  clearIAEsimplemented: PropTypes.func.isRequired,
  // Start Game Modal
  opened: PropTypes.bool.isRequired,
  handleStartGame: PropTypes.func.isRequired,
  // Errors
  errorPrairie: PropTypes.bool.isRequired,
  errorScore: PropTypes.bool.isRequired,
  errorTypesIAE: PropTypes.bool.isRequired,
  errorMare: PropTypes.bool.isRequired,
  handleOnCloseError: PropTypes.func.isRequired
}

GameBoard.defaultProps = {
  iaeImplemented: [],
  iaeMarkerImplemented: [],
  iaeGroupSelected: 0,
  iaeTypeSelected: 0
}

const mapStateToProps = state => ({
  game: state.game
})

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(GameBoard)
