import ProgressBar from './progressbar/ProgressBar';
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
            <div className='progress-bar'>
                <ProgressBar progress={Math.floor(doneTechs / technologies.length * 100)} />
            </div>
        </div>
    );
}

export default ProgressHeader;