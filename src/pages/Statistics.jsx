import ProgressHeader from '../components/ProgressHeader';
import useTechnologies from '../components/UseTechnologies';
import './Home.css'

export default function Statistics(){

    const { technologies } = useTechnologies();
  
    const stats = {
        total: technologies.length,
        done: technologies.filter(t => t.status === 'done').length,
        progress: technologies.filter(t => t.status === 'progress').length,
        pending: technologies.filter(t => t.status === 'pending').length
    };

    return (
        <div>  
            <div className="quick-stats">
            <div className="stat-card">
                <h3>Всего технологий</h3>
                <span className="stat-number">{stats.total}</span>
            </div>
            <div className="stat-card">
                <h3>Изучено</h3>
                <span className="stat-number" style={{color: '#10b981'}}>{stats.done}</span>
            </div>
            <div className="stat-card">
                <h3>В процессе</h3>
                <span className="stat-number" style={{color: '#f59e0b'}}>{stats.progress}</span>
            </div>
            <div className="stat-card">
                <h3>Ожидают</h3>
                <span className="stat-number" style={{color: '#6366f1'}}>{stats.pending}</span>
            </div>
            </div>

            <ProgressHeader technologies={technologies} />
        </div>
    )
}