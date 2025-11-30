import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../components/UseTechnologies';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies, updateTechStatus, updateTechnologyNotes } = useTechnologies();
  const [technology, setTechnology] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');

  useEffect(() => {
    if (technologies && techId) {
      const tech = technologies.find(t => t.id === parseInt(techId));
      setTechnology(tech);
      setEditedNotes(tech?.notes || '');
    }
  }, [technologies, techId]);

  const updateStatus = (newStatus) => {
    if (technology) {
      updateTechStatus(technology.id, newStatus);
    }
  };

  const handleSaveNotes = () => {
    if (technology) {
      updateTechnologyNotes(technology.id, editedNotes);
      setIsEditing(false);
    }
  };

  if (!technology) {
    return (
      <div className="page technology-detail-page">
    <div className="technology-detail">
        <div className="detail-card">
          <h1>Технология не найдена</h1>
        </div>
    </div>
    <div className="detail-section">
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn btn--primary">
          ← Назад к списку
        </Link>
        </div>
    </div>
    );
  }

  const statusLabels = {
    'pending': '⏳ Ожидание',
    'progress': '🔄 В процессе', 
    'done': '✅ Завершено'
  };

  const statusColors = {
    'pending': '#6366f1',
    'progress': '#f59e0b',
    'done': '#10b981'
  };

  return (
    <div className="page technology-detail-page">
      <div className="technology-detail">
        <div className="detail-card">
          <div className="detail-header">
            <h1>{technology.title}</h1>
            <span 
              className="status-badge"
              style={{ backgroundColor: statusColors[technology.status] }}
            >
              {statusLabels[technology.status]}
            </span>
          </div>

          <div className="detail-section">
            <h3>📝 Описание</h3>
            <p>{technology.description || 'Описание отсутствует'}</p>
          </div>

          <div className="detail-section">
            <h3>🎯 Статус изучения</h3>
            <div className="status-buttons">
              <button
                onClick={() => updateStatus('pending')}
                className={`status-btn ${technology.status === 'pending' ? 'active' : ''}`}
                data-status="pending"
              >
                {statusLabels['pending']}
              </button>
              <button
                onClick={() => updateStatus('progress')}
                className={`status-btn ${technology.status === 'progress' ? 'active' : ''}`}
                data-status="progress"
              >
                {statusLabels['progress']}
              </button>
              <button
                onClick={() => updateStatus('done')}
                className={`status-btn ${technology.status === 'done' ? 'active' : ''}`}
                data-status="done"
              >
                {statusLabels['done']}
              </button>
            </div>
          </div>

          <div className="detail-section">
            <div className="notes-header">
              <h3>📓 Мои заметки</h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn btn--outline"
                >
                  ✏️ Редактировать
                </button>
              ) : (
                <div className="notes-actions">
                  <button 
                    onClick={handleSaveNotes}
                    className="btn btn--primary"
                  >
                    💾 Сохранить
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditedNotes(technology.notes || '');
                    }}
                    className="btn btn--secondary"
                  >
                    ❌ Отмена
                  </button>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                placeholder="Добавьте свои заметки..."
                rows="6"
                className="notes-textarea"
              />
            ) : (
              <div className="notes-content">
                {technology.notes ? (
                  <p>{technology.notes}</p>
                ) : (
                  <p className="no-notes">Заметки отсутствуют</p>
                )}
              </div>
            )}
          </div>

          <div className="detail-meta">
            <p><strong>ID:</strong> {technology.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;