
import "./ChosenCorporasButton.css";

export default function ChosenCorporas ({selectedCorpora,onRemove}) {
    if (selectedCorpora.length === 0) return null;

    return(
        <div className="selected-corpora-summary">
        <span>Valda korpusar:</span>
        <div className="corpus-chip-container">
          {selectedCorpora.map((corpus) => (
            <div key={corpus} className="corpus-chip">
              {corpus}
              <button className="remove-btn" onClick={() => onRemove(corpus)}>×</button>
            </div>
          ))}
        </div>
      </div>
    );
}