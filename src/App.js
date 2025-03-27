import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sourcePath, setSourcePath] = useState('');
  const [destPath, setDestPath] = useState('');
  const [stopIIS, setStopIIS] = useState(false);
  const [services, setServices] = useState('');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('setupGeneratorSettings') || '{}');
    setSourcePath(savedSettings.sourcePath || '');
    setDestPath(savedSettings.destPath || '');
    setStopIIS(savedSettings.stopIIS || false);
    setServices(savedSettings.services || '');
  }, []);

  useEffect(() => {
    const settings = { sourcePath, destPath, stopIIS, services };
    localStorage.setItem('setupGeneratorSettings', JSON.stringify(settings));
  }, [sourcePath, destPath, stopIIS, services]);

  const handleBrowse = (type) => {
    const path = prompt(`Enter ${type} directory path:`);
    if (path) {
      if (type === 'source') setSourcePath(path);
      else if (type === 'destination') setDestPath(path);
    }
  };

  const handleAddService = () => {
    const service = prompt('Enter service name:');
    if (service) {
      setServices((prev) => (prev ? `${prev}\n${service}` : service));
    }
  };

  const handleGenerate = () => {
    if (!sourcePath || !destPath) {
      alert('Please provide both source and destination paths.');
      return;
    }

    const config = {
      sourcePath,
      destPath,
      stopIIS,
      services: services.split('\n').filter((s) => s.trim()), 
    };

    console.log('Generating executable with config:', config);
    alert('Executable generation triggered! Check console for config.');
  };

  return (
    <div className="App">
      <h1>Setup Generator</h1>

      <div>
        <label>Source Files Directory</label>
        <input
          type="text"
          value={sourcePath}
          onChange={(e) => setSourcePath(e.target.value)}
          placeholder="Enter or browse source path"
        />
        <button onClick={() => handleBrowse('source')}>Browse</button>
      </div>

      <div>
        <label>Destination Directory</label>
        <input
          type="text"
          value={destPath}
          onChange={(e) => setDestPath(e.target.value)}
          placeholder="Enter or browse destination path"
        />
        <button onClick={() => handleBrowse('destination')}>Browse</button>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={stopIIS}
            onChange={(e) => setStopIIS(e.target.checked)}
          />
          Stop IIS During Installation
        </label>
      </div>

      <div>
        <label>Services to Stop (One per line)</label>
        <textarea
          rows="4"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          placeholder="e.g., MyService1\nMyService2"
        />
        <button onClick={handleAddService}>Add Service</button>
      </div>

      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default App;
