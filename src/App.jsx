import './App.css'
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import { useState, useEffect } from 'react';
import QuickActions from './components/QuickActions';


function App() {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'pending', notes: '' },
      { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'done', notes: '' },
      { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'progress', notes: '' }
    ];
  });

  const [filteredTechnologies, setFilteredTechnologies] = useState(technologies);
  const [filter, setFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
  }, [technologies]);

  useEffect(() => {
    const filtered = technologies.filter(tech => {
      // по статусу
      const statusMatch = filter === 'all' || tech.status === filter;
      
      // текстовый
      const textMatch = textFilter === '' || 
        tech.title.toLowerCase().includes(textFilter.toLowerCase()) ||
        tech.description.toLowerCase().includes(textFilter.toLowerCase()) ||
        (tech.notes && tech.notes.toLowerCase().includes(textFilter.toLowerCase()));
      
      return statusMatch && textMatch;
    });
    
    setFilteredTechnologies(filtered);
  }, [technologies, filter, textFilter]);

  const updateTextFilter = (newFilter) => {
    setTextFilter(newFilter);
  };

  const filterTechnologies = (type) => {
    setFilter(type);
  };

  const updateTech = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          let newStatus;
          if (tech.status === 'pending') {
            newStatus = 'progress';
          } else if (tech.status === 'progress') {
            newStatus = 'done';
          } else if (tech.status === 'done') {
            newStatus = 'pending';
          }
          return { ...tech, status: newStatus };
        }
        return tech;
      })
    );
  };

  const setAllDone = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        return { ...tech, status: 'done' };
      })
    );
  };

  const setAllPending = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        return { ...tech, status: 'pending' };
      })
    );
  };

  const randomNextTech = () => {
    let pendingTechs = [];
    technologies.forEach(tech => {
        if(tech.status === 'pending')
          pendingTechs.push(tech);
    });
    if(pendingTechs.length === 0)
        return;

    let maxInd = pendingTechs.length;
    let randIndex = Math.floor(Math.random()* 10) % maxInd;
    
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === pendingTechs[randIndex].id) {
          return { ...tech, status: 'progress' };
        }
        return tech;
      })
    );
  };

  return (
    <div className="App">
      <ProgressHeader technologies={technologies} />
      <div className="main">
        <div className="help__menu">
          <QuickActions setAllDone={setAllDone} 
            setAllPending = {() => setAllPending()} randomNextTech = {() => randomNextTech()} />
          <div className="filter__buttons">
            <button className='btn' onClick={() => filterTechnologies('all')}>Все</button>
            <button className='btn' onClick={() => filterTechnologies('pending')}>Ожидание</button>
            <button className='btn' onClick={() => filterTechnologies('progress')}>В процессе</button>
            <button className='btn' onClick={() => filterTechnologies('done')}>Завершено</button>
          </div>
          <div className="search__menu">
            <p>Фильтр по содержанию</p>
            <textarea rows="1" placeholder="" onChange={(e) => updateTextFilter(e.target.value)}></textarea>
          </div>
        </div>
        <div className="technologies__menu">
          <ul>
            {filteredTechnologies.map(tech => {
              return (
                <li key={tech.id}>
                  <TechnologyCard 
                    id={tech.id} 
                    title={tech.title} 
                    description={tech.description} 
                    status={tech.status} 
                    change={() => updateTech(tech.id)} 
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App
