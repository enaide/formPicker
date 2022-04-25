import React from 'react';

import Login from './components/Login/Login';
import siteMap from "./siteMap.svg";

function App() {

  return (
    <React.Fragment>      
      <main>
        <Login />
        <img className='map' src={siteMap} alt="site amp" />
      </main>
    </React.Fragment>
  );
}

export default App;
