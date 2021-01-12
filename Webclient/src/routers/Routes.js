import React from 'react'
import { Route, Switch } from 'react-router'
import Contact from '../containers/Contact/Contact'
import Home from '../containers/Home/Home'

function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/contact' component={Contact} />
            </Switch>
        </div>
    )
}

export default Routes
