import { useState,useEffect } from 'react'
import {Routes,Route} from 'react-router-dom'
import Cookies from 'universal-cookie'

//Pages
import Home from './pages/Home'
import Auth from './pages/Auth'

//AuthRoute
import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'

function App() {
  const cookies=new Cookies()
  // const [username,setusername]=useState(()=>cookies.get('USER')?cookies.get('USER'):null)
  // const [userId,setuserId]=useState(()=>cookies.get('USERID')?cookies.get('USERID'):null)
  return (
    <>
      <Routes>
        <Route path='/*' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>}/>
      </Routes>
        
      
    </>
  )
}

export default App
