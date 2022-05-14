import Login from "./components/Login";
import Main from "./components/Main/Main";
import { BrowserRouter as NavLink, Route, Switch } from "react-router-dom";
import Editor from './components/Editor/Editor';
import View from './components/Editor/View';
import "./App.css"
import Loader from './components/Loader/Loader';
import Emoji from "./components/Emoji/Emoji"
import { NextUIProvider } from '@nextui-org/react';
import ViewFromFolder from "./components/Editor/ViewFromFolder";

const App = () => {
  return (
    <NextUIProvider>
      <div>
        {
          <NavLink>
            <Switch>
              {/* <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Main} />
                <Route path="/editor" exact component={Editor} />
                <Route path="/view/:id" exact component={View} /> */}
              {/* <Route path="/login" exact>
                    <Login />
                  </Route>
                  <Route path="/emoji" exact>
                    <Emoji />
                  </Route>
                  <Route path="/" exact>
                    <Main />
                  </Route>
                  <Route path="/:id" exact>
                    <View />
                  </Route>
                  <Route path="/loader" exact>
                    <Loader />
                  </Route> */}

              <Route exact path="/" component={Main} />
              <Route path="/login" component={Login} />
              <Route path="/page/:id" component={View} />
              <Route path="/emoji" component={Emoji} />
              <Route path="/loader" component={Loader} />
              <Route path="/folder/:folderid/:pageid" component={ViewFromFolder} />

            </Switch>
          </NavLink>
        }
      </div>
    </NextUIProvider>

  )
}

export default App