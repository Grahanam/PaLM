import { useState,useEffect } from 'react'
import {Routes,Route} from 'react-router-dom'
import Cookies from 'universal-cookie'


//Pages
import Main from './Main'
import Response from './Response'
import Leaderboard from './Leaderboard'



import Nav from '../containers/nav'
import Topbar from '../containers/topbar'


const Home=()=>{
  const cookies=new Cookies()
  const [token,settoken]=useState(()=>cookies.get('TOKEN')?cookies.get('TOKEN'):null)
  const [username,setusername]=useState(()=>cookies.get('USER')?cookies.get('USER'):null)
  const [userId,setuserId]=useState(()=>cookies.get('USERID')?cookies.get('USERID'):null)
  const [open,setopen]=useState(false)
  const [data,setdata]=useState([])
  
  const getresponse=()=>{
    fetch(`http://localhost:4000/response/${userId}`,{
      method:'GET',
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":token
      },
    }).then(response=>response.json())
    .then(response=>{
      // console.log(response)
      setdata(response.data)
    })
    .catch(err=>{
      alert(err.message)
    })
  }

  const saveresponse=(ques,ans,userId)=>{
    console.log('userid',userId)
    fetch('http://localhost:4000/save',{
        method:'POST',
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":token
        },
        body:JSON.stringify({ques:ques,ans:ans,user:userId})
    }).then((response)=>response.json())
    .then(response=>{
        console.log(response)
        getresponse()
        alert(response.message)
    }).catch(err=>{
        console.log(err)
    })
}

  useEffect(()=>{
    getresponse()
  },[])
    return(
        <>
           <div className='md:flex lg:flex flex-row h-[100vh]'>
            <Nav token={token} data={data} update={getresponse} open={open} setopen={setopen}/>
            <div className='md:w-[70%] lg:w-[80%]  h-[100vh]  overflow-auto'>
              <Topbar token={token} username={username} open={open} setopen={setopen}/>
            <Routes>
                <Route path='/' element={<Main token={token} username={username} userId={userId} update={getresponse} saveresponse={saveresponse}/>}/>
                <Route path='/:id' element={<Response token={token} saveresponse={saveresponse} userId={userId}/>}/>
                <Route path='/leaderboard' element={<Leaderboard token={token}/>}/>
            </Routes>
            </div>
            </div>
        </>
    )
}

export default Home