// AppRouter.js
import React from 'react';
import MovieList from './pages/MovieList';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
  );
};

export default AppRouter;
