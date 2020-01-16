import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Container, Divider, Form, Header, Image, Popup, Segment } from 'semantic-ui-react'
import actions from '../../../../config/actionsCards'

const Step2 = (props) => {
  return (
    <Segment basic padded>
      <Header content='Action du livret GEA' />

      <Divider hidden />

      <p>Joueurs-agriculteurs, souhaitez-vous débloquer une action du livret GEA ?</p>

      <Divider hidden />

      <Container textAlign='left'>
        <Form>
          {
            actions.map(a =>
              <Form.Field key={a.numCard}>
                <Popup
                  wide
                  content={<Image src={a.cardPicture} />}
                  trigger={
                    <Checkbox
                      radio
                      disabled={props.actionsDone.includes(a.numCard)}
                      label={a.numCard + '. ' + a.title}
                      value={a.numCard}
                      checked={props.actionSelected === a.numCard}
                      onClick={props.onChangeAction}
                    />
                  }
                />
              </Form.Field>)
          }
        </Form>
      </Container>

      <Divider hidden />

      <Button
        onClick={props.onValidateActions}
        content={props.actionSelected === -1 ? 'Pas d\'action' : 'Appliquer l\'action ' + props.actionSelected}
        color='red'
      />
    </Segment>
  )
}

Step2.propTypes = {
  actionsDone: PropTypes.array.isRequired,
  onChangeAction: PropTypes.func.isRequired,
  actionSelected: PropTypes.number.isRequired,
  onValidateActions: PropTypes.func.isRequired
}

Step2.defaultProps = {
  actionsDone: []
}

export default Step2