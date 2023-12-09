import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

const initialState = {
  movies: [],
  favorites: [],
  comments: {},
  ratings: {},
  indications: {},
};

const actionTypes = {
  SET_MOVIES: 'SET_MOVIES',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_RATING: 'ADD_RATING',
  SET_INDICATION: 'SET_INDICATION',
  CLEAR_INDICATION: 'CLEAR_INDICATION'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_MOVIES:
      return { ...state, movies: action.payload };
    case actionTypes.ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case actionTypes.REMOVE_FAVORITE:
      const movieIdToRemove = action.payload;
      const filteredFavorites = state.favorites.filter((movie) => movie.imdbID !== movieIdToRemove);
      const updatedComments = { ...state.comments };

      // Remove comment associated with the movie being removed from favorites
      delete updatedComments[movieIdToRemove];

      return {
        ...state,
        favorites: filteredFavorites,
        comments: updatedComments,
      };
    case actionTypes.ADD_COMMENT:
      return { ...state, comments: { ...state.comments, [action.payload.movieId]: action.payload.comment } };
    case actionTypes.ADD_RATING:
      return { ...state, ratings: { ...state.ratings, [action.payload.movieId]: action.payload.rating } };
    case actionTypes.SET_INDICATION:
      return {
        ...state,
        indications: { ...state.indications, [action.payload]: true },
      };
    case actionTypes.CLEAR_INDICATION:
      const { [action.payload]: _, ...updatedIndications } = state.indications;
      return { ...state, indications: updatedIndications };
    default:
      return state;
  }
};


export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedFavorites, setSelectedFavorites] = useState([]); // New state




  const value = {
    state,
    dispatch,
    actionTypes,
    selectedFavorites,
    setSelectedFavorites,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieContext;
