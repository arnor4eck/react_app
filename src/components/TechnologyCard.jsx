import TechnologyNotes from '../TechnologyNotes';
import './TechnologyCard.css'
import { Link } from 'react-router-dom';

function TechnologyCard({id, title, description, status, change, notes, updateTechnologyNotes}) {
    return (
        <div className={"technology__card technology__card--" + status}>
            <h1>{title}</h1>
            <div className="technology__card--content">
                <p>{description}</p>
            </div>
            <div className='technology__card--bottom'>
                <TechnologyNotes notes={notes} onNotesChange={updateTechnologyNotes} techId={id} />
                <div className='technology__card--actions'>
                    <Link className={"technology__card--status technology__card--status--" + status} to={`/technology/${id}`}>Подробнее</Link>
                    <button onClick={() => change(id)} className={"technology__card--status technology__card--status--" + status}>{status}</button>
                </div>
            </div>
        </div>
    );
}

export default TechnologyCard;