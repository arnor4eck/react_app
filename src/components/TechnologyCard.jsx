import { useState } from 'react';
import './TechnologyCard.css'

function TechnologyCard({id, title, description, status, change}) {
    return (
        <a onClick={() => change(id)} >
            <div className={"technology__card technology__card--" + status}>
                <h1>{title}</h1>
                <div className="technology__card--content">
                    <p>{description}</p>
                    <button 
                    className={"technology__card--status technology__card--status--" + status}>{status}</button>
                </div>
            </div>
        </a>
    );
}

export default TechnologyCard;