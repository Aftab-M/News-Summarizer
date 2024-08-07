import { Auth0Provider } from '@auth0/auth0-react'
import './App.css'
import HomePage from './components/HomePage'
import './index.css'
import Login from './login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(props) {
  

  return (
    <>
      <HomePage user={props.user}/>      
    </>
  )
}

export default App
