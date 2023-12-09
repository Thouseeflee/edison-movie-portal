import React, { useEffect } from 'react';
import { useMovieContext } from '../../contexts/MovieContext';
import ActionButton from '../elements/ActionButton';
import Navbar from '../elements/Navbar';

const Favorites = () => {
  const { state, dispatch, actionTypes } = useMovieContext();
  const { favorites, comments } = state;

  // function to remove favorite from store 
  const removeFavorite = (movieId) => {
    dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: movieId });
  };

  return (
    <div>
      <Navbar navOnly={true} />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Favorite Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <div key={movie.imdbID} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover object-center" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{movie.Title}</h2>
                  <p className="text-gray-600">{movie.Year}</p>
                  {comments[movie.imdbID] && (
                    <p className="text-gray-600 mt-2">{comments[movie.imdbID]}</p>
                  )}
                  <ActionButton bgColor="blue" action="removeFavorite" onClick={() => removeFavorite(movie.imdbID)} />
                </div>
              </div>
            ))
          ) : (
            <p>No favorite movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
