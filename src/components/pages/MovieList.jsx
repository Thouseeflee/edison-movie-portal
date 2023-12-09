import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../elements/Pagination';
import SearchBar from '../elements/SearchBar';
import { useMovieContext } from '../../contexts/MovieContext';
import FavoriteButton from '../elements/FavoriteButton';
import Comments from '../elements/Comments';
import Navbar from '../elements/Navbar';
import { FaFilm } from 'react-icons/fa';

const MovieList = () => {
    const { state, dispatch, actionTypes, selectedFavorites, setSelectedFavorites } = useMovieContext();
    const { movies, favorites } = state; // Destructure movies and favorites from context state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch movies function based on search term and page
    const fetchMovies = async (searchTerm, page) => {
        try {
            setLoading(true);
            let response;
            if (searchTerm.length > 0) {
                response = await axios.get(
                    `https://www.omdbapi.com/?apikey=2fc0712b&s=${searchTerm}&page=${page}`
                );
            } else {
                response = await axios.get(
                    `https://www.omdbapi.com/?apikey=2fc0712b&s=movie&page=${page}`
                );
            }

            if (response.data?.Search) {
                dispatch({ type: actionTypes.SET_MOVIES, payload: response.data.Search });
                setTotalPages(Math.ceil(response.data.totalResults / 10));
            } else {
                dispatch({ type: actionTypes.SET_MOVIES, payload: [] });
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            dispatch({ type: actionTypes.SET_MOVIES, payload: [] });
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies('', currentPage);
    }, [currentPage]);

    // Function to handle favorite button click
    const handleFavorite = (movieId) => {
        const isFavorite = favorites.some((movie) => movie.imdbID === movieId);

        if (isFavorite) {
            dispatch({ type: actionTypes.REMOVE_FAVORITE, payload: movieId });
            setSelectedFavorites(selectedFavorites.filter((id) => id !== movieId));
        } else {
            const selectedMovie = movies.find((movie) => movie.imdbID === movieId);
            dispatch({ type: actionTypes.ADD_FAVORITE, payload: selectedMovie });
            setSelectedFavorites([...selectedFavorites, movieId]);
        }
    };

    // Function to add comments to store
    const addCommentWithIndication = (movieId, comment) => {
        dispatch({ type: actionTypes.ADD_COMMENT, payload: { movieId, comment } });

        dispatch({ type: actionTypes.SET_INDICATION, payload: movieId });

        setTimeout(() => {
            dispatch({ type: actionTypes.CLEAR_INDICATION, payload: movieId });
        }, 3000); // 3 seconds
    };

    // Function to handle search
    const handleSearch = (searchTerm) => {
        setCurrentPage(1);
        fetchMovies(searchTerm, 1);
    };

    // Function to handle pagination
    const handleGoToPage = (page) => {
        setCurrentPage(page);
    };

    // Function to handle previous page
    const handleGoToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // Function to handle next page
    const handleGoToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div style={{ backgroundColor: '#f2f2f2' }}>
            <Navbar handleSearch={handleSearch} />
            <div className='container mx-auto px-4 py-8 mb-5' style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2 bg-gray-200 h-6"></h2>
                                    <p className="text-gray-600 bg-gray-200 h-4"></p>
                                </div>
                            </div>
                        ))
                    ) : Array.isArray(movies) && movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie.imdbID} className="bg-white rounded-lg overflow-hidden shadow-md my-10">
                                <img src={movie.Poster} alt={movie.Title} className="w-full h-72 object-cover object-center" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{movie.Title}</h2>
                                    <p className="text-gray-600">{movie.Year}</p>

                                    <FavoriteButton
                                        movieId={movie.imdbID}
                                        isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                                        handleFavorite={handleFavorite}
                                    />

                                    <div className="flex items-center">
                                        {selectedFavorites.includes(movie.imdbID) && (
                                            <Comments movieId={movie.imdbID} addComment={addCommentWithIndication} />
                                        )}
                                        {state.indications[movie.imdbID] && (
                                            <span className="text-green-500 ml-2">Comment added!</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        null
                    )}
                </div>
                {loading || (Array.isArray(movies) && movies.length > 0) ? (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={handleGoToPage}
                        goToPrevPage={handleGoToPrevPage}
                        goToNextPage={handleGoToNextPage}
                    />
                ) : (
                    <div className="flex items-center justify-center h-72" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <FaFilm className="text-4xl text-gray-500" />
                            </div>
                            <p className="font-bold text-gray-700">Sorry, no movies found.</p>
                            <p className="text-gray-600">Please try a different search term or check back later.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default MovieList;
