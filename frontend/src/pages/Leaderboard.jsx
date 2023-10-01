import { faArrowRight, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
const API_BASE_URL=import.meta.env.VITE_BASE_URL


const Leaderboard=({token})=>{
    const [data,setdata]=useState([])
  
    const getresponse=()=>{
      fetch(`${API_BASE_URL}/response`,{
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
    useEffect(()=>{
       getresponse()
    },[])
  
    return(
        <>
        <div className="h-[90%]  overflow-auto  pr-4">
         
         <div className="bg-neutral-600 p-3 text-lg">
            Leaderboard
         </div>
         <div className="pl-3">
         {data.length>0?<>
            {data.map((response,index)=>(
                    <div key={index} className='p-2 mt-4 md:text-md lg:text-lg hover:bg-neutral-700 hover:cursor-pointer rounded text-left'>
                        <div className='flex flex-row justify-between p-1 text-neutral-300'>
                          <Link className='truncate ' to={`/${response._id}`}>
                            <span className='text-neutral-200'>{response.ques}</span>
                          </Link>
                          <div className="flex flex-row">
                            <i className="text-red-500 pr-1"><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></i> {response.like}
                          </div>
                       </div>
                    </div>
                    
                
            ))}
         </>:<></>}
            </div>

        </div>
        </>
    )
}


export default Leaderboard