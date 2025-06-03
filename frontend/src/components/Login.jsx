import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'

const textcount =0

const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState} = useForm()
    const {errors} = formState;
    const onSubmit =(data)=>console.log(data)


  return (
    <div>
            <div className="h-screen bg-[#213448] flex items-center justify-center w-full">

                <div className="bg-gray-900 p-10 rounded-lg">

                    <h1 className="text-amber-50 text-2xl font-bold">
                        Login to your account
                    </h1>

                  <div className="mt-6">
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: { value: true, message: "Email is required" } })}
                                
                                className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
                            />
                            <p className="text-red-400 text-sm">{errors.email?.message}</p>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: { value: true, message:"password is required" }})}
                                className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
                            />
                            <p className="text-red-400 text-sm">{errors.password?.message}</p>
                            <button
                                type="submit"
                                className="bg-amber-500 text-white font-bold py-2 rounded hover:bg-amber-600 transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>

                </div>

            </div>
    </div>
  )
}

export default Login
