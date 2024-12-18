import React from 'react'
import Routerpage from './Component/Routerpage';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Routerpage></Routerpage>
      </Provider>
    </div>
  );
}

export default App;
