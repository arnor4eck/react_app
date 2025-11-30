import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from './components/modal/Modal';
import Navigation from './components/routing/Navigation';
import Home from './pages/Home';
import Technologies from './pages/Technologies';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import useLocalStorage from './components/UseLocalStorage';
import { useEffect } from 'react';

function App() {
  const [savedBackground, setSavedBackground] = useLocalStorage('background', '#3a4333');
  
  useEffect(() => {
      document.body.style.backgroundColor = savedBackground;
  }, [savedBackground]);

  return (
    <Router>
      <div className="App">
        <Modal />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings savedBackground={savedBackground} setSavedBackground={(color) => setSavedBackground(color)} />} />
          <Route path="/technology/:techId" element={<TechnologyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App