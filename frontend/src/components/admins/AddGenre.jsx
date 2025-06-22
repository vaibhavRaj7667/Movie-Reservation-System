import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';

const AddGenre = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const urls = import.meta.env.VITE_API_URL;

    const HandelSubmit= async(data)=>{
        try {
            const response = await axios.post(`${urls}/genres/`,data,{
                withCredentials: true
            })
            console.log('Genre added successfully:', response.data);
            reset(); // Clear form after successful submission
        } catch (error) {
            console.error('Error adding genre:', error);
            alert('Error adding genre. Please try again.');
            
        }
        
    }

  return (
    <div>
        <div>
            <h1 className='text-2xl font-bold text-center my-4'>Add Genre</h1>
            <form onSubmit={handleSubmit(HandelSubmit)} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'>
                <div className='mb-4'>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Genre Name</label>
                    <input
                        type='text'
                        id='name'
                        {...register('name', { required: 'Genre name is required' })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
                </div>
                <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    Add Genre
                </button>
            </form>
        </div>
      
    </div>
  )
}

export default AddGenre
