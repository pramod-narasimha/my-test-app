import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PostComponent from '../Components/component1/PostComponent'

const PublicRoutes = () => (
  <Switch>
    <Route exact path={['/', '/login', '/forgot-password', '/register']}>
      <PostComponent/>
    </Route>
    <Route exact path="/app">
    <> </>
    </Route>
  </Switch>
)

export default PublicRoutes
