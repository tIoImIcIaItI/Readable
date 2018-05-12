/*eslint dot-location: ["error", "object"]*/
import React, { Component } from 'react';
import CategoriesList from './components/CategoriesList';
import { Route, Switch } from 'react-router-dom';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>

        <nav>
          <Route path="/:category?" component={CategoriesList} />
        </nav>

        <main>
          <Switch>
            <Route exact path="/:category?" component={PostsList} />
            <Route exact path="/:category/:id" component={PostDetail} />
          </Switch>
        </main>

      </div>
    );
  }
}

export default App;
