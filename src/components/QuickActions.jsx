import './QuickActions.css'

function QuickActions({setAllDone, setAllPending, randomNextTech}) {
    return (
        <div className="quickActions">
            <button className="btn randomTech" onClick={() => randomNextTech()}>Случайный выбор следующей технологии</button>
            <button className='btn' onClick={() => setAllDone()}>Отметить все как выполненные</button>
            <button className='btn' onClick={() => setAllPending()}>Сбросить все статусы</button>
        </div>
    )
}

export default QuickActions;