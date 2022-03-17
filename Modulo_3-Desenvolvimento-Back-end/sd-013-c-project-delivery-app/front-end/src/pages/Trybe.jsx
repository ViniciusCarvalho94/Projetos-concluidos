import React from 'react';
import '../App.css';
import rockGlass from '../images/rockGlass.svg';

function Trybe() {
  return (
    <div className="App">
      <span className="logo">TRYBER</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
    </div>
  );
}

export default Trybe;
