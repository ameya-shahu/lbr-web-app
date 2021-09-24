import React, { useState, useEffect } from 'react'
import Home from './Home'
import Login from './Login'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ThankYou from './ThankYou';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/thankYou" render={() => <ThankYou />} />
                <Route path="/home" render={() => <Home />} />
                <Route path='/' component={Login} />
            </Switch>
        </Router>
    )
}

export default Routes
