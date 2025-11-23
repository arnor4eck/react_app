function TechnologyNotes({ notes, onNotesChange, techId }) {
 return (
 <div className="notes-section">
 <textarea
 value={notes}
 onChange={(e) => {
    onNotesChange(techId, e.target.value);
 }}
 placeholder="Записывайте сюда важные моменты..."
 rows="2"

 />
 </div>
 );
}

export default TechnologyNotes;