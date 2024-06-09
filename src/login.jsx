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
        <>
           {(!isAuthenticated) && <Button className='bg-black p-5 m-5 text-white rounded-md hover:bg-gray-800 transition ease' onClick={()=>{loginWithRedirect()}}>
                Login, maybe ?
            </Button> }
            {(isLoading) && <>Page loading, maybe ?</>}
            
            {(user) && <MainPage user={user}/>}
        </>
    )
}


export default Login