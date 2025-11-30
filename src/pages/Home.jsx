import { Link } from 'react-router-dom';
import './Home.css'

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className='hello-section'>
            <h1>🚀 Добро пожаловать в Трекер технологий</h1>
            <p>Управляйте своим прогрессом в изучении новых технологий</p>
        </div>
        
        <div className="action-buttons">
          <Link to="/technologies" className="btn btn--primary">
            Перейти ко всем технологиям
          </Link>
          <Link to="/add-technology" className="btn btn--secondary">
            Добавить новую технологию
          </Link>
        </div>
      </div>
    </div>
  );
}