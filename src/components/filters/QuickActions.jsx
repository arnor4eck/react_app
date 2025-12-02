import { useState } from 'react';
import Modal from '../modal/Modal';
import './QuickActions.css'

function QuickActions({setAllDone, setAllPending, randomNextTech, technologies}) {
    const [isOpened, setModalOpened] = useState(false);

    const exportData = () => {
        const data = JSON.stringify(technologies, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        console.log('Данные успешно экспортированы');
        setModalOpened(true);
  }

    return (
        <div className="quickActions">
            <Modal title="Данные экспортированы" isOpen={isOpened} onClose={()  => setModalOpened(false)}>
                <p>Данные успешно подготовлены для экспорта!</p>
            </Modal>
            <button className="btn" onClick={() => randomNextTech()}>Случайный выбор следующей технологии</button>
            <button className="btn" onClick={() => exportData()}>Экспорт данных</button>
            <button className='btn' onClick={() => setAllDone()}>Отметить все как выполненные</button>
            <button className='btn' onClick={() => setAllPending()}>Сбросить все статусы</button>
        </div>
    )
}

export default QuickActions;