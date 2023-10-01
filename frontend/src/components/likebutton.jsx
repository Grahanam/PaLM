import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState,useEffect } from "react"
const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Likebutton=({id,token,userId,update})=>{
    const [check,setcheck]=useState(false)
    const checklike=()=>{
        fetch(`${API_BASE_URL}/like/check?user=${userId}&response=${id}`,{
            method:'GET',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":token
            }
        }).then(response=>response.json())
        .then(response=>{
            // console.log(response)
            setcheck(response.data)
        }).catch(err=>{
            console.log(err.message)
        })
    }

    const givelike=()=>{
        fetch(`${API_BASE_URL}/like/`,{
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({user:userId,response:id})
        })
        .then(response=>response.json())
        .then(response=>{
            checklike()
            update()
            alert(response.message)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    const removelike=({nooflike})=>{
        fetch(`${API_BASE_URL}/like?user=${userId}&response=${id}`,{
            method:'DELETE',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":token
            }
        }).then(response=>response.json())
        .then(response=>{
            checklike()
            update()
            alert(response.message)
        }).catch(err=>{
            console.log(err.message)
        })
    }

    useEffect(()=>{
        checklike()
    },[id,userId])
    return(
        <>
        {check?<>
            <i onClick={removelike} className="text-red-500 text-xl p-1 hover:cursor-pointer"><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></i>
        </>:<>
            <i onClick={givelike} className="text-gray-500 text-xl p-1 hover:cursor-pointer"><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></i>
        </>}
           
        </>
    )
}

export default Likebutton