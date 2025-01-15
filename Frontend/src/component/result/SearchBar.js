import React from 'react';
import './SearchBar.css';

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <input
            type="text"
            placeholder="Search by event title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
        />
    );
}

export default SearchBar;
