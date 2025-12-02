import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from './components/modal/Modal';
import Navigation from './components/routing/Navigation';
import Home from './pages/Home';
import Technologies from './pages/technologies/Technologies';
import TechnologyDetail from './pages/technologies/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/settings/Settings';
import useLocalStorage from './hooks/UseLocalStorage';
import { useEffect } from 'react';
import BookList from './pages/books/BookList';
import TechnologiesAPI from './pages/technologies/TechnologiesAPI';
import BookListSearch from './pages/books/BookListSearch';

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
        <Routes basename="/react_app">
          <Route path="/" element={<Home />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/technologies_api" element={<TechnologiesAPI />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings savedBackground={savedBackground} setSavedBackground={(color) => setSavedBackground(color)} />} />
          <Route path="/technology/:techId" element={<TechnologyDetail />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books_search" element={<BookListSearch />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App