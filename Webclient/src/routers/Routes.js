import React from 'react'
import { Route, Switch } from 'react-router'
import Contact from '../containers/Contact/Contact'
import Home from '../containers/Home/Home'
import Crypto from '../containers/Crypto/Crypto'
import { ProfitCalculator } from '../containers/ProfitCalculator/ProfitCalculator'

function Routes() {
    return (
        <Switch>
             <Route exact path='/' component={Home} />
             <Route exact path='/contact' component={Contact} />
             <Route exact path='/crypto' component={Crypto} />
             <Route exact path='/profitCalculator' component={ProfitCalculator} />
          </Switch>
    )
}

export default Routes
