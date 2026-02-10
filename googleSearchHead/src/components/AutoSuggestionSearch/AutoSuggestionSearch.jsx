import { useState } from 'react';
import useTypeHead from '../../Hooks/useTypeHead';
import './AutoSuggestionSearch.css';

function AutoSuggestionSearch({}) {
  const [inputValue, setInputValue] = useState('');
  const [activeIdx, setActiveIdx] = useState(-1);
  const { suggestions, loading } = useTypeHead(inputValue);

  function handleInputChange(e) {
    setInputValue(e.target.value);
    setActiveIdx(-1);
  }

  function handleKeyDown(e) {
    if (e.key == 'ArrowDown') {
      setActiveIdx(prev => prev < suggestions.length ? prev + 1 : prev);
    }
    if (e.key == 'ArrowUp') {
      setActiveIdx(prev => prev > 0 ? prev -1 : -1);
    }
    if (e.key === 'Enter') {
      setInputValue(suggestions[activeIdx]);
      setActiveIdx(-1);
    }
  }

  return (
    <div className="container">
      <input
        name="typehead"
        type="text"
        value={inputValue} 
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {console.log('~suggestions',suggestions)}
      {loading && <div className="loading">Loading...</div>}
      <ul>
        {suggestions?.map((item, idx) => {
          const matchedIdx = item.toLowerCase().indexOf(inputValue.toLowerCase());
          console.log('~matchedIdx', matchedIdx);
          return (<li key={idx} className={activeIdx === idx ? 'active' : ''}>{item}</li>)
        })}
      </ul>
    </div>
  )
}

export default AutoSuggestionSearch;