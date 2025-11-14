import './ProgressHeader.css'

function ProgressHeader({technologies = []}) {
    let doneTechs = 0;
    let progressTechs = 0;
    technologies.forEach(tech => {
        if(tech['status'] == 'done')
            doneTechs += 1;
        if(tech['status'] == 'progress')
            progressTechs += 1;
    })

    return (
        <div className="progressHeader">
            <div className="progress__technologies">
                <p>Предстоит: {technologies.length - doneTechs - progressTechs}</p>
                <p>Изучено: {doneTechs}</p>
                <p>В процессе изучения: {progressTechs}</p>
            </div>
            <div className='progress__bar'>
                <div className="progress__bar--line" 
                    style={{ width: `${Math.floor(doneTechs / technologies.length * 100)}%` }}>
                    {Math.floor(doneTechs / technologies.length * 100)}%
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;