import { useState } from 'react';
import TechnologyCard from '../../components/TechnologyCard';
import useTechnologiesApi from '../../hooks/useTechnologiesApi';

export default function TechnologiesAPI() {
  const { technologies, loading, error, refetch, addTechnology } = useTechnologiesApi()

  if(loading){
        return (
            <div className="loading">
                <h1>Загрузка...</h1>
            </div>
        )
        }else if (error) {
        return (
            <div className="errors">
                <h2>Ошибка при загрузке.</h2>
                <p>{error}</p>
                <button onClick={refetch}>Попробовать снова</button>
            </div>
        );
    }

        return (
            <div className="technologies-page">
            <div className="main">
                <div className="help__menu">
                    <div className="search__menu">  
                        
                    </div>
                </div>
                <div className="technologies__menu">
                    <ul>
                        {technologies.map(tech => {
                        return (
                            <li key={tech.id}>
                            <TechnologyCard 
                                id={tech.id} 
                                title={tech.title} 
                                description={tech.description} 
                                status={tech.status} 
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