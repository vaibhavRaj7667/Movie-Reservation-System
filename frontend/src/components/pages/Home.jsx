import React, { useEffect, useState } from 'react';
import Navbar from '../custom/Navbar';

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
   
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/genres/', {
          method: 'GET',
        });
        const data = await response.json();
        setGenres(data.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
   
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/movies/?genres=${selectedGenre}`,
          {
            method: 'GET',
          }
        );
        const data = await response.json();
        setMovie(data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(true);
      }
    };

    fetchMovies();
  }, [selectedGenre]); 

  return (
    <div className="min-h-screen bg-[#213448]">
      <Navbar />

      <div className="p-4">
        <p className="text-2xl font-bold text-center mt-2 text-amber-50">Movies</p>

        {/* Genre Filter Dropdown */}
        <div className="flex justify-end mt-4">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <div className="text-center mt-8">
            <p className="text-red-500 text-xl font-bold">404 - Movies Not Found</p>
            <p className="text-gray-300 mt-2">Something went wrong. Please try again later.</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {movie.map((movie, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg shadow-lg w-85 flex flex-col items-center"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-100 h-120 rounded-lg object-cover mb-2"
                />
                <div className="m-2">
                  <p className="text-amber-50 text-xl font-bold mt-2 mb-1 self-start">
                    {movie.title}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {movie.description}
                  </p>
                </div>

                <div className="flex justify-between w-full px-2 mb-2">
                  <span className="text-gray-400 text-xs">{movie.duration}</span>
                  <span className="text-gray-400 text-xs">{movie.release_date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;