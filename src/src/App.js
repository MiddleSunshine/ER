import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import routers from './config/routers.tsx'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {
          routers.map(router => {
            return (
              <Route
                path={router.path}
                component={router.component}
              ></Route>
            )
          })
        }
      </BrowserRouter>
    )
  }
}

export default App;
