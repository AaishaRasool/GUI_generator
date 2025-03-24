import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <h1>Setup Generator</h1>
      <div>
        <label>Source Files Directory</label>
        <input type="text" />
        <button>Browse</button>
      </div>
      <div>
        <label>Destination Directory</label>
        <input type="text" />
        <button>Browse</button>
      </div>
      <div>
        <label>
        <input type="checkbox" />
          Stop IIS During Installation
        </label>
      </div>
      <div>
        <label>Services to stop (One per line)</label>
        <textarea rows="4"></textarea>
        <button>Add Service</button>
      </div>
      <button>Generate</button>
    </div>
  );
}

export default App;
