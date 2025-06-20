import React, { useState, useEffect, use } from 'react'
import Navbar from '../custom/Navbar'
import axios from 'axios'
import MovieForm from '../custom/MovieForm'

const Addmovies = () => {
  // const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [genres, setGenres] = useState([]);
  const [Movies, setMovies] = useState([]);
  const [editedMovie, setEditedMovie] = useState(null);
  const urls = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${urls}/movies/`, {
          withCredentials: true
        });

        setMovies(response.data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [urls]);

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
  }, [urls]);

  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // timeZoneName: 'short'
    };

    return date.toLocaleString('en-US', options);
  }
  
  

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-500 py-8">
        <div className="flex items-center justify-center ">
          <MovieForm
            genres ={genres}
            existingData  ={editedMovie ? editedMovie : null}
          />
        </div>

        <div className="text-gray-200">
          {Movies.map((movie, key)=>(
            <div key={key} 
            
            onClick={() => setEditedMovie(movie)}
            className="bg-gray-700  p-4 m-4 rounded shadow-md">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p>Genre: {movie.genres}</p>
              <p>Release Date: { formatDate(movie.release_date)}</p>
              <p>Description: {movie.description}</p>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default Addmovies