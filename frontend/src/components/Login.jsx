import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState} = useForm()
    const {errors} = formState;
    const [logins, setlogins] = useState(true)

    const onSubmit = async (data) => {
    try {
        setlogins(false)
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        
        // const result = await response.json()
        if (!response.ok) {
            toast.error(result.detail || "Login failed. Please check your credentials.")
            setlogins(true)
            return
            
        }
        setlogins(!logins)
    
        // localStorage.setItem('access', result.access)
        // localStorage.setItem('refresh', result.refresh)
        toast.success("Login successful!")

        setTimeout(() => {
                navigate('/home')
            }, 1000)



        console.log("Login successful:");
    } catch (error) {
        toast.error("An error occurred. Please try again.")
        console.error("Login failed:", error);
    }
}




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
                                placeholder="email"
                                {...register("username", { required: { value: true, message: "Email is required" } })}
                                
                                className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
                            />
                            <p className="text-red-400 text-sm">{errors.username?.message}</p>
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
                                {logins?"Login":"Logging in..."}
                            </button>
                        </form>
                    </div>

                    
                     <ToastContainer />
                </div>

            </div>
    </div>
  )
}

export default Login
