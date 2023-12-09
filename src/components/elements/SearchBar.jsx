import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ handleSearch }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = async (inputValue) => {
        try {
            const response = await axios.get(
                `https://www.omdbapi.com/?apikey=2fc0712b&s=${inputValue}&type=movie`
            );

            if (response.data.Search) {
                return response.data.Search.map((movie) => ({
                    name: movie.Title,
                }));
            }
            return [];
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            return [];
        }
    };

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

    const onChange = async (event, { newValue }) => {
        setValue(newValue);
        const suggestions = await getSuggestions(newValue);
        setSuggestions(suggestions);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        handleSearch(suggestion.name);
    };

    const inputProps = {
        placeholder: 'Search movies...',
        value,
        onChange,
        className:
            'border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500',
    };

    const onSearchIconClick = () => {
        handleSearch(value);
    };

    return (
        <div className="relative md:w-96">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={() => { }}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
                theme={{
                    container: 'relative',
                    suggestionsContainer: suggestions.length ? 'absolute z-10 bg-white border border-gray-300 w-full mt-2 rounded-md shadow-lg' : null,
                    suggestionsList: 'overflow-auto max-h-48',
                    suggestion: 'cursor-pointer px-3 py-2',
                    suggestionHighlighted: 'bg-blue-100',
                }}
            />
            <FaSearch
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
                onClick={onSearchIconClick}
            />
        </div>

    );
};

export default SearchBar;
