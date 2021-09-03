import React from 'react'
import { BrowserRouter, Route,Switch } from "react-router-dom";
import routers from './config/routers.tsx'
import Index from './page/index'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {
            routers.map(router => {
              return (
                <Route
                  path={router.path}
                  component={router.component}
                >
                </Route>
              )
            })
          }
          </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
