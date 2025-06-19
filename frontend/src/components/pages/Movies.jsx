import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../custom/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../custom/Footer';

function Movies() {
 const [Mymovies, SetMymovies] = useState({});
  const [loading, setLoading] = useState(true);
  const urls = import.meta.env.VITE_API_URL;
  const { pk } = useParams();
  const [Myshows, setMyshows] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(`${urls}/shows/${Mymovies.title}/`, {
          withCredentials: true
        });
        setMyshows(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(`error--> ${error}`);
      }
    };

    if (Mymovies.title) {
      fetchShows();
    }
  }, [Mymovies]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${urls}/update/${pk}`, {
          withCredentials: true
        });
        SetMymovies(response.data.data);
        // console.log(response.data.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [pk]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#213448] flex items-center justify-center">
        <div className="text-amber-50 text-xl">Loading...</div>
      </div>
    );
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#213448]">
      <Navbar />
      <div className="relative h-64 md:h-80 lg:h-96">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xs"
          style={{ backgroundImage: `url(${Mymovies.poster})` }}
        ></div>
        <div className="absolute inset-0 bg-opacity-20"></div>
      </div>

      <div className="relative -mt-32 md:-mt-40 lg:-mt-48 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 p-6 flex justify-center lg:justify-start">
                <img
                  src={Mymovies.poster}
                  alt={Mymovies.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="lg:w-2/3 p-6 lg:pl-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-50 leading-tight">
                  {Mymovies.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-gray-300 mt-4">
                  <div className="flex items-center space-x-2">
                    <span className=" font-bold text-blue-500">
                      <p>Release Date :</p>
                    </span>
                    <span>
                      {formatDate(Mymovies.release_date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className=" font-bold text-blue-500">
                      <p>Runtime :</p>
                    </span>
                    <span>{formatDuration(Mymovies.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className=" font-bold text-blue-500">
                      <p>Original Language:</p>
                    </span>
                    <span>{Mymovies.language}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {Mymovies.genres?.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-600 text-amber-50 rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-amber-50 mb-3">Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                    {Mymovies.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  {Mymovies.imdb_page && (
                    <a
                      href={Mymovies.imdb_page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>View on IMDb</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
                  <div className="text-2xl font-bold text-amber-50 mt-5">
                    <span>
                      <p>Shows</p>
                    </span>
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-2xl p-6">
                  {Myshows ? (<>
                  
                 
                  
                


                  {Myshows.map((show) => (
                    <div
                      key={show.id}
                      className="bg-gray-800 text-amber-50 rounded-lg shadow-lg p-4 flex flex-col justify-between"
                      onClick={()=> navigate(`/booking/`,{state:
                                                          {total: show.available_seats,
                                                            show_id : show.id,
                                                            movie_name : show.movie
                                                          }})}
                    >
                      <div>
                        <h3 className="text-lg font-bold">{show.movie}</h3>
                        <p className="mt-2">
                          <span className="font-semibold">Show Time:</span>{" "}
                          {new Date(show.show_time).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold">Available Seats:</span>{" "}
                          {show.available_seats}
                        </p>
                      </div>
                      <button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                        // onClick={() => handleBookTicket(show.id)}
                      >
                        Book Ticket
                      </button>
                    </div>
                  ))}

                   </>):
                   (<>
                    <p>show not listed yet</p>
                  
                  </>)}
                </div>
              </div>




        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Movies;