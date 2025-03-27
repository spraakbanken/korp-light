import './ChosenCorpora.css'

export default function ChosenCorpora ({selectedCorpora}) {
    return (
        <div className="chosen__corpora__container">
            <h1 className='chosen__corpora__header'>Valda Korpusar</h1>
            {selectedCorpora.map(e => {
                if (Object.keys(e).length === 0) {
                    return null;
                } else {
                    return <p>{e.corpusLabel}</p>
            }
            })}
        </div>

    );
}