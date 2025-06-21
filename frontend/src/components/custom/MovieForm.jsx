import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';


const MovieForm = ({genres}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const urls = import.meta.env.VITE_API_URL;
    const onSubmit = async (data) => {
    setLoading(true);
    setError(false);
    
    try {
      // format data
      const formattedData = {
        genres: Array.from(data.genres).map(genreId => parseInt(genreId)),
        language: data.language,
        title: data.title,
        description: data.description,
        release_date: data.releaseDate,
        duration: parseInt(data.duration),
        imdb_page: data.imdbUrl,
        poster: data.posterUrl
      };

      console.log('Formatted data:', formattedData);
      
      // Send to backend
      const response = await axios.post(`${urls}/movies/`, formattedData, {
        withCredentials: true
      });
      
      console.log('Movie added successfully:', response.data);
      reset(); // Clear form after successful submission
      alert('Movie added successfully!');
      
    } catch (error) {
      console.error('Error adding movie:', error);
      setError(true);
      alert('Error adding movie. Please try again.');
    } finally {
      setLoading(false);
    }
  }



  return (
    <div>
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl mx-4 shadow-xl sm:w-2xl">
            <h1 className="text-amber-50 text-3xl font-bold mb-8 text-center">Add New Movie</h1>

            {error && (
              <div className="bg-red-600 text-white p-3 rounded mb-4">
                An error occurred. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div>
                <input
                  type="text"
                  placeholder="Movie Title"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Language */}
              <div>
                <input 
                  type="text"
                  placeholder="Language (e.g., Hindi, English)"
                  {...register("language", { required: "Language is required" })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                {errors.language && (
                  <p className="text-red-400 text-sm mt-1">{errors.language.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <textarea
                  placeholder="Movie Description"
                  rows="4"
                  {...register("description", { required: "Description is required" })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none resize-vertical"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Genres */}
              <div>
                <label className="block text-amber-50 text-sm font-medium mb-2">
                  Select Genres (Hold Ctrl/Cmd to select multiple)
                </label>
                <select
                  multiple
                  {...register("genres", { required: "At least one genre is required" })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none min-h-32"
                >
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                {errors.genres && (
                  <p className="text-red-400 text-sm mt-1">{errors.genres.message}</p>
                )}
              </div>

              {/* Release Date */}
              <div>
                <label className="block text-amber-50 text-sm font-medium mb-2">
                  Release Date
                </label>
                <input
                  type="date"
                  {...register("releaseDate", { required: "Release date is required" })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                {errors.releaseDate && (
                  <p className="text-red-400 text-sm mt-1">{errors.releaseDate.message}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <input
                  type="number"
                  placeholder="Duration (in minutes)"
                  min="1"
                  {...register("duration", { 
                    required: "Duration is required",
                    min: { value: 1, message: "Duration must be at least 1 minute" }
                  })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                {errors.duration && (
                  <p className="text-red-400 text-sm mt-1">{errors.duration.message}</p>
                )}
              </div>

              {/* IMDB URL */}
              <div>
                <input 
                  type="url" 
                  placeholder="IMDB URL (https://www.imdb.com/title/...)"
                  {...register("imdbUrl", { 
                    required: "IMDB URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Please enter a valid URL"
                    }
                  })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                {errors.imdbUrl && (
                  <p className="text-red-400 text-sm mt-1">{errors.imdbUrl.message}</p>
                )}
              </div>

              {/* Poster URL */}
              <div>
                <input
                  type="url"
                  placeholder="Poster URL (https://...)"
                  {...register("posterUrl", { 
                    required: "Poster URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Please enter a valid URL"
                    }
                  })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
                {errors.posterUrl && (
                  <p className="text-red-400 text-sm mt-1">{errors.posterUrl.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded font-medium transition duration-300 ${
                  loading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {loading ? 'Adding Movie...' : 'Add Movie'}
              </button>
            </form>
          </div>
      
    </div>
  )
}

export default MovieForm
