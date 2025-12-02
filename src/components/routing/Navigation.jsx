import { Link, useLocation } from 'react-router-dom';
import './Navigation.css'

export default function Navigation() {
    const location = useLocation();

    return (
        <nav className="main-navigation">
            <div className="nav-brand">
                <h2>Навигация</h2>
            </div>

            <ul className="nav-menu">
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
                        Главная
                    </Link>
                </li>

                <li>
                    <Link to="/technologies" className={location.pathname === '/technologies' ? 'nav-link active' : 'nav-link'}>
                        Все технологии
                    </Link>
                </li>

                {/*<li>
                    <Link to="/technologies_api" className={location.pathname === '/technologies_api' ? 'nav-link active' : 'nav-link'}>
                        Все технологии API
                    </Link>
                </li>*/}


                <li>
                    <Link to="/statistics" className={location.pathname === '/statistics' ? 'nav-link active' : 'nav-link'}>
                        Статистика
                    </Link>
                </li>

                <li>
                    <Link to="/settings" className={location.pathname === '/settings' ? 'nav-link active' : 'nav-link'}>
                        Настройки
                    </Link>
                </li>

                <li>
                    <Link to="/add-technology" className={location.pathname === '/add-technology' ? 'nav-link active' : 'nav-link'}>
                        Добавить технологию
                    </Link>
                </li>

                <li>
                    <Link to='/books' className={location.pathname === '/books' ? 'nav-link active' : 'nav-link'}>
                        Книги
                    </Link>
                </li>

                <li>
                    <Link to='/books_search' className={location.pathname === '/books_search' ? 'nav-link active' : 'nav-link'}>
                        Книги поиск
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
