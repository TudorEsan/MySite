import React from 'react'
import { Route, Switch } from 'react-router'
import Contact from '../Containers/Contact/Contact'
import Home from '../Containers/Home/Home'
import Crypto from '../Containers/Crypto/Crypto'

function Routes() {
    return (
        <Switch>
             <Route exact path='/' component={Home} />
             <Route exact path='/contact' component={Contact} />
             <Route exact path='/crypto' component={Crypto} />
          </Switch>
    )
}

export default Routes
