import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RuralisHeader from '../common/RuralisHeader'
import { Container, Divider, Icon, Statistic, Table } from 'semantic-ui-react'

const AllGamesHistory = (props) => {
  return (
    <div>
      <RuralisHeader title='Historique des parties' />

      <Container>
        <Statistic.Group>
          <Statistic label='Parties jouées' value={props.games.length} />
          <Statistic label='gagnées' value={props.games.length} color='green' />
          <Statistic label='perdues' value={props.games.length} color='red' />
        </Statistic.Group>
      </Container>

      <Divider />

      <Container>
        <Table textAlign='center' selectable padded color='red'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Partie</Table.HeaderCell>
              <Table.HeaderCell>Victoire</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
              <Table.HeaderCell>Joueurs</Table.HeaderCell>
              <Table.HeaderCell>Scenario</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {props.games
              .map(game =>
                <Table.Row key={game._id} value={game._id} onClick={() => props.redirectToGameHistory(game._id)}>
                  <Table.Cell content={'Partie ' + game._id} />

                  <Table.Cell positive>
                    <Icon color='green' name='winner' /> gagnée
                  </Table.Cell>

                  <Table.Cell>
                    <Statistic.Group size='mini'>
                      <Statistic label='production' value={game.production} color='red' />
                      <Statistic label='temps de travail' value={game.tempsTravail} color='yellow' />
                      <Statistic label='environnement' value={game.environnement} color='green' />
                      <Statistic label='ancrage social' value={game.ancrageSocial} color='purple' />
                    </Statistic.Group>
                  </Table.Cell>

                  <Table.Cell>
                    <Icon name='users' /> {game.players.length}
                  </Table.Cell>

                  <Table.Cell>
                    <Icon name='file text' /> {game.scenario}
                  </Table.Cell>
                </Table.Row>
              )}

          </Table.Body>
        </Table>
      </Container>
    </div>
  )
}

AllGamesHistory.propTypes = {
  games: PropTypes.array.isRequired,
  redirectToGameHistory: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  games: state.games
})

export default connect(
  mapStateToProps
)(AllGamesHistory)
