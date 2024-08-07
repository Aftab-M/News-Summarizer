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
        <div className="relative w-full h-screen flex flex-wrap justify-center items-center">
            <div className="absolute inset-0 z-0">
                <img src="https://png.pngtree.com/thumb_back/fw800/background/20231221/pngtree-retro-old-english-newspaper-background-photo-image_15548852.png" className="w-full h-screen object-cover" alt="" />
            </div>
                

                <div className="fixed z-10 w-full flex flex-wrap justify-center items-center px-80 sm:justify-between">
                    <div className="text-black text-5xl rounded-md  z-10 bg-gray-400 px-14 py-4">
                        <p style={{fontFamily: 'serif'}}>News_AI</p>
                    </div>
                    
                    <Button className='bg-black mt-36 sm: p-4 px-16 sm:m-5  text-white rounded-full hover:bg-gray-800 transition ease' onClick={()=>{loginWithRedirect()}}>
                        Login
                    </Button>
                    
                </div>
        </div>}
        {(user) && <MainPage user={user}/>}
        </div>
    )
}


export default Login
