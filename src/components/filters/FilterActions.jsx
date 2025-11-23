export default function FilterActions({filterTechnologies}){
    return (
        <div className="filter__buttons">
            <button className='btn' onClick={() => filterTechnologies('all')}>Все</button>
            <button className='btn' onClick={() => filterTechnologies('pending')}>Ожидание</button>
            <button className='btn' onClick={() => filterTechnologies('progress')}>В процессе</button>
            <button className='btn' onClick={() => filterTechnologies('done')}>Завершено</button>
        </div>
    )
}