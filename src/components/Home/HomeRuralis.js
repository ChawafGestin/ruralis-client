import React from 'react'
import './styleHome.css'

import { Button, Container, Divider, Grid, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ruralisLogo from '../../assets/ruralisLogo.png'

const HomeRuralis = () => (
  <Container>

    <Image src={ruralisLogo} size='medium' centered />

    <Grid columns={3} stackable padded relaxed>
      <Grid.Row>
        <Grid.Column>
          <Link to='/new/game'>
            <Button className='homeBtn' color='red' fluid content='Nouvelle Partie' size='huge' />
          </Link>
        </Grid.Column>

        <Grid.Column>
          <Link to='/join/game'>
            <Button className='homeBtn' color='red' fluid content='Rejoindre Partie' size='huge' />
          </Link>
        </Grid.Column>

        <Grid.Column>
          <Link to='/history/games'>
            <Button className='homeBtn' color='red' fluid content='Historique Parties' size='huge' />
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Divider hidden />

    <Container textAlign='right'>
      <Link to='/game/rules'>
        <Label as='a' icon='file' size='big' content='Règles du jeu' />
      </Link>
    </Container>

  </Container>
)

export default HomeRuralis
