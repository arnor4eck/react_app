import { useState, useEffect } from 'react';
import TechnologyCard from '../../components/TechnologyCard';
import ProgressHeader from '../../components/progressbar/ProgressHeader';
import QuickActions from '../../components/filters/QuickActions';
import FilterActions from '../../components/filters/FilterActions';
import useTechnologies from '../../hooks/UseTechnologies';

export default function Technologies() {
  const { technologies, setAllDone, setAllPending, 
          randomNextTech, updateTechnologyNotes, updateTech } = useTechnologies()

  const [filteredTechnologies, setFilteredTechnologies] = useState(technologies);
  const [filter, setFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    const filtered = technologies.filter(tech => {
      if(!tech) return false;
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

  return (
    <div className="technologies-page">
      <ProgressHeader technologies={technologies} />
      <div className="main">
        <div className="help__menu">
          <QuickActions 
            setAllDone={setAllDone} 
            setAllPending={setAllPending} 
            randomNextTech={randomNextTech} 
            technologies={technologies} 
          />
          <FilterActions filterTechnologies={filterTechnologies} />
          <div className="search__menu">
            <p>Фильтр по содержанию</p>
            <input 
              type="text" 
              placeholder="Поиск по названию, описанию или заметкам..."
              value={textFilter}
              onChange={(e) => updateTextFilter(e.target.value)}
              className="search-input"
            />
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
                    updateTechnologyNotes={updateTechnologyNotes}
                    notes={tech.notes}
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