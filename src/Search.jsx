import React, { useState } from 'react';
import './Search.css';
import { BiSearchAlt2 } from 'react-icons/bi';

function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    alert(`You searched for: ${query}`);
  };

  // Voice input function
  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setQuery(spokenText);
      alert(`You spoke: ${spokenText}`);
    };

    recognition.onerror = (event) => {
      alert("Voice recognition failed. Please try again.");
    };
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <BiSearchAlt2 className="search-icon" />
        <input style={{color:'white'}}
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Go</button>
        <button onClick={handleVoiceSearch}>🎤</button>
      </div>
    </div>
  );
}

export default Search;
