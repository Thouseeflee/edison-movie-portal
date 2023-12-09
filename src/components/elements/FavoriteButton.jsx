import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const FavoriteButton = ({ movieId, isFavorite, handleFavorite }) => {
  const toggleFavorite = () => {
    handleFavorite(movieId);
  };

  return (
    <button onClick={toggleFavorite} className="flex items-center text-yellow-500 focus:outline-none my-2">
      {isFavorite ? <AiFillStar className="w-6 h-6 mr-1" /> : <AiOutlineStar className="w-6 h-6 mr-1" />}
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
