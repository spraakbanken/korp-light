import './ChosenCorpora.css'

export default function ChosenCorpora ({selectedCorpora}) {
    
    return (
        <div className="chosen__corpora__container">
            <h1 className='chosen__corpora__header'>Valda Korpusar</h1>
            {Object.entries(selectedCorpora).map(([corpusID, corpusLabel]) => {
                return <p key={corpusID}>{corpusLabel}</p>
            })}
        </div>

    );
}