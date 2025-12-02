import useLocalStorage from "./UseLocalStorage";

const initTechnologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'pending', notes: '', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'] },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'done', notes: '', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'] },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'progress', notes: '', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'] },
]

export default function useTechnologies(){
    const [technologies, setTechnologies] = useLocalStorage('technologies', initTechnologies);

    const updateTechStatus = (id, newStatus) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        )
    }

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
        setTechnologies(prevTechs => 
            prevTechs.map(tech => ({ ...tech, status: 'done' }))
        );
    }

    const setAllPending = () => {
        setTechnologies(prevTechs =>
            prevTechs.map(tech => ({ ...tech, status: 'pending' }))
        )
    }

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

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech =>
        prevTech.map(tech =>
            tech.id === techId ? { ...tech, notes: newNotes } : tech
        )
        );
    };

    return { technologies, setAllDone, setAllPending, randomNextTech, updateTechnologyNotes, updateTech, updateTechStatus }
}