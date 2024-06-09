import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "@headlessui/react";
import App from "./App";
import HomePage from "./components/HomePage";
import MainPage from "./components/mainpage";


function Login(){
    const {loginWithRedirect} = useAuth0()
    const {user, isAuthenticated, isLoading} = useAuth0()


    return(
        <div>
            {(!isAuthenticated) && 
        <div className="relative w-screen h-screen flex flex-wrap justify-center items-center">
            <div className="absolute inset-0 z-0">
                <img src="https://i.ytimg.com/vi/yGEOXfRfLAo/maxresdefault.jpg" className="w-full h-screen object-cover" alt="" />
            </div>
                

                <div className="relative z-10 w-full flex flex-wrap justify-center items-center px-80 sm:justify-between">
                    <div className="text-black text-5xl rounded-md  z-10">
                        <p className="">News_AI</p>
                    </div>
                    
                    <Button className='bg-black p-5 m-5 text-white rounded-md hover:bg-gray-800 transition ease' onClick={()=>{loginWithRedirect()}}>
                        Login, maybe ?
                    </Button> 
                    
                </div>
        </div>}
        {(user) && <MainPage user={user}/>}
        </div>
    )
}


export default Login