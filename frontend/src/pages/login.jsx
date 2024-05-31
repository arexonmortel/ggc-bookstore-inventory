import {useState, useEffect} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import { TEInput, TERipple } from "tw-elements-react";
import Logo from '../assets/ggc-logo.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault()

    try{
      const response = await axios.post('http://localhost:5555/login', {username, password})
      .then((res)=>{
        console.log("Login successful")
        console.log(res.data)

        localStorage.setItem('token', res.data.token)
        toast.success('Login Successful', {
            onClose: () => {
                navigate('/home')
            }
          });
          
    
      })
    }catch(err){
      console.log(err)
      toast.error('Invalid Credentials');
    }
  }

  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src={Logo}
              className="w-full"
              alt="GGC LOGO"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <h1 className="text-3xl font-bold mb-10 text-center">GGC INVENTORY</h1>
            <h5 className="text-lg font-semibold mb-5 text-gray-600">Admin Login</h5>
            <form onSubmit={handleLogin}>
              {/* <!-- Email input --> */}
              <TEInput
                type="text"
                label="Username"
                size="lg"
                className="mb-6"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              ></TEInput>

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Login
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
      autoClose={1000} />
    </section>
  );
}