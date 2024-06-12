import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Auth0Provider useRefreshTokens={true} domain='dev-ly5u84pbjsnv5z6h.us.auth0.com' clientId='P3vGVo1167HUZnqE3ip4tJZNaAh6iS2L' authorizationParams={{redirect_uri: window.location.origin}}>
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={ <Login /> }>
        </Route>
      </Routes>
      
    </BrowserRouter>
    </Auth0Provider>
  ,
)
