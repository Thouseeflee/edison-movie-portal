// App.js
import './App.css';
import AppRouter from './components/AppRouter';
import { MovieProvider } from './contexts/MovieContext';

function App() {
  return (
    <div className="app">
      <MovieProvider>
        <AppRouter />
      </MovieProvider>
    </div>
  );
}

export default App;
