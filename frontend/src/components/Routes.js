import React, { useState } from 'react'
import Home from './Home'
import Login from './Login'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Routes() {
    const [user, setUser] = useState(false)

    return (
        <Router>
      {
        !user ? (
          <Switch>
            <Route path='/' component={Login} />
          </Switch>
        ) : (
          <div>
            <Switch>
              {/* Home page */}
              <Route path="/" render={() => <Home />} />

            </Switch>
          </div>
        )
      }

    </Router>
    )
}

export default Routes
