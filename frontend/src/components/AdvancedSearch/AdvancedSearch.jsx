import './AdvancedSearch.css'

export default function AdvancedSearch({words}) {
    return(
        <div className='advanced__search__container'>
            {Object.values(words).map((word, idx) => {
            
            if (word !== "")
                return <p className='advanced__search__word'
                    key={idx}>{word}</p>
            
            })}
        </div>
    );
}