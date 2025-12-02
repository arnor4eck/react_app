import { useState, useEffect } from 'react';

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchTechnologies = async () => { // Загрузка технологий из API
        try {
            setLoading(true);
            setError(null);

            // Сейчас имитируем загрузку с задержкой
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock данные - в реальном приложении замените на реальный API
            const mockTechnologies = [
                { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'pending', notes: '', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'] },
                { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'done', notes: '', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'] },
                { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'progress', notes: '', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'] },
            ];

            setTechnologies(mockTechnologies);

        } catch (err) {
            setError('Не удалось загрузить технологии');
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const addTechnology = async (techData) => { // Добавление новой технологии
        try {
            // Имитация API запроса
            await new Promise(resolve => setTimeout(resolve, 500));

            const newTech = {
                id: Date.now(), // В реальном приложении ID генерируется на сервере
                ...techData,
                createdAt: new Date().toISOString()
            };

            setTechnologies(prev => [...prev, newTech]);
            return newTech;

        } catch (err) {
            throw new Error('Не удалось добавить технологию');
        }
    };
        // Загружаем технологии при монтировании
    useEffect(() => {
        fetchTechnologies();
    }, []);

    return {
        technologies,
        loading,
        error,
        refetch: fetchTechnologies,
        addTechnology
    };
}

export default useTechnologiesApi;
