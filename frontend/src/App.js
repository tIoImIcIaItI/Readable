/*eslint dot-location: ["error", "object"]*/
import React, { Component } from 'react';
import CategoriesList from './components/CategoriesList';
import { Route, Switch } from 'react-router-dom';
import { Appbar } from 'muicss/react';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import NotFound from './components/NotFound';
import './styles/app.css';

class App extends Component {

  render() {
    return (

      <div className="App">

        <header>
          <Appbar>

            <h1 className="App-title mui--appbar-height mui--appbar-line-height">
              Readable
            </h1>

            <nav>
              <Route path="/:category?" component={CategoriesList} />
            </nav>

          </Appbar>
        </header>

        <main>
          <Switch>
            <Route exact path="/app/error/not-found" component={NotFound} />

            <Route exact path="/:category?" component={PostsList} />
            <Route exact path="/:category/:id" component={PostDetail} />

            <Route component={NotFound} />
          </Switch>
        </main>

        <footer>
          <Appbar className='footer'>
            <span className='footer-copyright'>Copyright © 2018 Readable</span>
          </Appbar>
        </footer>

      </div>
    );
  }
}

export default App;
