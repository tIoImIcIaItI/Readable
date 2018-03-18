import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {

  state = {
    celectedCategory: ''
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <nav>
list all available categories, which should link to a category view for that category
        </nav>

        <main>
all posts (possibly filtered to a category) with links to post details, 
sort widget, 
new post widget
        </main>

      </div>
    );
  }
}

export default App;
