import React, { useEffect, useState } from 'react';
import Navbar from '../custom/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
   const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState('');
  const urls = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${urls}/genres/`, {
          withCredentials: true
        });
        setGenres(response.data.data);
      } catch (error) {
        setError(true);
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${urls}/movies/?genres=${selectedGenre}`,
          {
            withCredentials: true
          }
        );
        setMovie(response.data.data);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 justify-items-center">
            {movie.map((movie, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg shadow-lg w-85 flex flex-col items-center"
                onClick={()=> navigate(`/movies/${movie.id}`)}
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