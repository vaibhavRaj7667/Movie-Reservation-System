import React from 'react'
import Navbar from '../custom/Navbar'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Footer from '../custom/Footer'

const Addshows = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [movies, setMovies] = useState([]);
    const urls = import.meta.env.VITE_API_URL;

    useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${urls}/movies/`, {
          withCredentials: true
        });

        setMovies(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [urls]);

    const handelform = async (data) => {
        try {
            const response = await axios.post(`${urls}/shows/`, data, {
                withCredentials: true
            });
            console.log('Show added successfully:', response.data);
            reset(); // Clear form after successful submission

        } catch (error) {
            console.error('Error adding show:', error);
            alert('Error adding show. Please try again.');
            
        }
    }

  return (
    <div className='h-screen bg-gray-500 w-full' >
        {/* <Navbar/> */}

        <div className='flex flex-col items-center p-6 min-h-screen bg-gray-500'>
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl mx-4 shadow-xl sm:w-2xl">
            <h1 className="text-amber-50 text-3xl font-bold mb-8 text-center">Add New Show</h1>
            <form
            onSubmit={handleSubmit(handelform)}
            className='p-6 space-y-6'
            action="">

                <div>
                <label className="block text-amber-50 text-sm font-medium mb-2">
                    Select Movie
                </label>
                <select
                    {...register("movie", { required: "Movie selection is required" })}
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                    <option value="">Select a movie</option>
                    {movies.map((movie) => (
                    <option key={movie.id} value={movie.title}>
                        {movie.title}
                    </option>
                    ))}
                </select>
                {errors.movie && (
                    <p className="text-red-400 text-sm mt-1">{errors.movie.message}</p>
                )}
                </div>

                <div>
                <label className="block text-amber-50 text-sm font-medium mb-2">
                  Release Date
                </label>
                <input
                  type="date"
                  {...register("show_time", { required: "Release date is required" })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                {errors.releaseDate && (
                  <p className="text-red-400 text-sm mt-1">{errors.releaseDate.message}</p>
                )}
              </div>

                <div>
                    <input
                    type="number"
                    placeholder="Available Seats"
                    {...register("available_seats", { required: "Title is required" })}
                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                    {errors.title && (
                    <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                 <button
                    type="submit"
                    className={`w-full p-3 bg-blue-600 rounded font-medium transition duration-300 text-white`}
                >
                    Add Shows
              </button>


            </form>
        </div>

        </div>

        
        {/* <Footer/> */}
    </div>
  )
}

export default Addshows
