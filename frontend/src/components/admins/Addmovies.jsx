import React, { useState, useEffect } from 'react'
import Navbar from '../custom/Navbar'
import axios from 'axios'
import MovieForm from '../custom/MovieForm'

const Addmovies = () => {
  // const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [genres, setGenres] = useState([]);
  const urls = import.meta.env.VITE_API_URL;

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

  

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-500 py-8">
        <div className="flex items-center justify-center ">
          <MovieForm
            genres ={genres}
          />
        </div>
      </div>
    </div>
  )
}

export default Addmovies