import TechnologyNotes from '../TechnologyNotes';
import './TechnologyCard.css'

function TechnologyCard({id, title, description, status, change, notes, updateTechnologyNotes}) {
    return (
        <a onClick={() => change(id)} >
            <div className={"technology__card technology__card--" + status}>
                <h1>{title}</h1>
                <div className="technology__card--content">
                    <p>{description}</p>
                </div>
                <div className='technology__card--bottom'>
                    <TechnologyNotes notes={notes} onNotesChange={updateTechnologyNotes} techId={id} />
                    <button className={"technology__card--status technology__card--status--" + status}>{status}</button>
                </div>
            </div>
        </a>
    );
}

export default TechnologyCard;