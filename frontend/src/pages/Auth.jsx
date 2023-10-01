import { faBrain, faSwatchbook } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import Cookies from 'universal-cookie'
const cookies=new Cookies
const API_BASE_URL=import.meta.env.VITE_BASE_URL



const Auth=()=>{
    const [bool,setbool]=useState(false)
    const [username,setusername]=useState('')
    const [fullname,setfullname]=useState('')
    const [password,setpassword]=useState('')
    const [confirmpass,setconfirmpass]=useState('')
    // const [role,setrole]=useState('user')

    const navigate=useNavigate()
    
    const signup=()=>{
        fetch(`${API_BASE_URL}/user/signup`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:username,fullname:fullname,password:password})
        }).then((response)=>{
           if(!response.ok){
             return response.json().then((data)=>{
                console.log('response triggered')
                alert(data.message)
             })
           }
           else{
            return response.json().then((data)=>{
                console.log('ok response')
                login()
            })
           }
        })
        .catch((err)=>{
            alert('Internal Server Error')
        })
    }

    const login=()=>{
        fetch(`${API_BASE_URL}/user/login`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:username,password:password})
        }).then((response)=>{
            if(!response.ok){
                return response.json().then((data)=>{
                    // console.log(data)
                    // throw new Error(`http error ${data.message}`)
                    
                    alert(data.message)
                })
            }else{
                return response.json().then((data)=>{
                    // console.log(data)
                    cookies.set("TOKEN",data.token,{
                        path:"/",
                    })
                    cookies.set("USER",data.user,{
                        path:"/",
                    })
                    cookies.set("USERID",data.userId,{
                        path:"/",
                    })
                    cookies.set("FULLNAME",data.fullname,{
                        path:"/",
                    })
                    setpassword('')
                    setusername('')
                    navigate('/')
                })
            }
        })
        .catch((err)=>{
            alert('Internal Server Error')
        })
    }

    return(
        <>
        <div className="flex h-screen items-center justify-center flex-col">
         <div className="text-4xl flex text-orange-500 pb-20"><i className="text-white p-1 text-bold mr-1 text-2xl bg-black rounded"><FontAwesomeIcon icon={faBrain}/></i> PaLM</div>
        {bool?<>
        <form className="pb-4 flex flex-col">
            <input className="p-1 border rounded hover:border-orange-500 mb-2 focus:ring focus:ring-orange-500" type='text' placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)}/>
            <input className="p-1 border rounded hover:border-orange-500 mb-2 focus:ring focus:ring-orange-500" type='password' placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)} />
        </form>
        <button onClick={()=>login()}>Login</button>

        <div className="pt-2 ">New User?<span className="text-blue-500 cursor-pointer" onClick={()=>{
            setbool(!bool) 
            setusername('') 
            setpassword('')
            }}> Signup</span>
        </div>
        </>:
        <>
        <form className="pb-4 flex flex-col">
            <input className="p-1 border rounded hover:border-orange-500 mb-2 focus:ring focus:ring-orange-500" type='text' placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)} />
            <input className="p-1 border rounded hover:border-orange-500 mb-2 focus:ring focus:ring-orange-500" type='text' placeholder='Fullname' value={fullname} onChange={(e)=>setfullname(e.target.value)} />
            <input className="p-1 border rounded hover:border-orange-500 mb-2 focus:ring focus:ring-orange-500" type='password' placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)} />
            <input className="p-1 border rounded hover:border-orange-500 mb-2 focus:ring focus:ring-orange-500" type='password' placeholder='Confirm Password' value={confirmpass} onChange={(e)=>setconfirmpass(e.target.value)} />
            {/* <select className="p-1 border rounded hover:border-orange-500 mb-2 focus:ring focus:ring-orange-500"  value={role} onChange={(e)=>setrole(e.target.value)}>
                <option className="p-1 text-base border rounded hover:border-orange-500 mb-2" value='user' >Learner</option>
                <option className="p-1 border rounded hover:border-orange-500 mb-2" value='instructor'>Instructor</option>
            </select> */}
        </form>
        <button onClick={()=>signup()}>Sign Up</button>
        <div className="pt-2">Already User?<span className="text-blue-500 cursor-pointer" onClick={()=>{
            setbool(!bool) 
            setusername('') 
            setfullname('')
            setpassword('')
            setconfirmpass('')
            }}> Login</span>
        </div>
        </>}
        </div>
        </>
    )
}

export default Auth