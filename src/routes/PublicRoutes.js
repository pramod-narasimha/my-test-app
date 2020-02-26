import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PriceListComponent from '../Components/PriceListComponent/PriceListComponent'

const PublicRoutes = () => (
  <Switch>
    <Route exact path='/'>
      <PriceListComponent/>
    </Route>
  </Switch>
)

export default PublicRoutes
