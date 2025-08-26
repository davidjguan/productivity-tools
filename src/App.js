import './App.css';
import { useState, useEffect } from 'react';
import Pomodoro from './Pomodoro';
import TaskList from './TaskList';
import BackgroundNoise from './BackgroundNoise';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <div>
        <Pomodoro />
        <BackgroundNoise />
      </div>
      <div>
        <TaskList />
      </div>
      <div className="darkmode-toggle-container">
        <label className="darkmode-label">
          <span>{darkMode?"☀️":"🌙"}</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={e => setDarkMode(e.target.checked)}
            className="darkmode-slider"
          />
          <span className="darkmode-slider-track"></span>
        </label>
      </div>
    </div>
  );
}

export default App;
