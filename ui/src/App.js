import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import HRApp from './containers/HRApp/HRApp';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <HRApp />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
