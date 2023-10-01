import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import Likebutton from "../components/likebutton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import ReactMarkdown from "react-markdown"
const API_BASE_URL=import.meta.env.VITE_BASE_URL

const Response=({userId,saveresponse,token})=>{
    const {id}=useParams()
    const [data,setdata]=useState({})
    const getresponse=()=>{
        fetch(`${API_BASE_URL}/response/single/${id}`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":token
            }
        }).then(response=>response.json())
        .then(response=>{
            setdata(response.data)
            // console.log(response.data)
        }).catch(err=>{
            alert(err.message)
        })
    }
    useEffect(()=>{
        getresponse()
    },[id,userId])
    return(
        <>
        <div className="h-[90%] overflow-auto pr-2 md:pr-4 lg:pr-4 text-[12px] md:text-md lg:text-md">
            {data?<>
                <div className='flex flex-row p-3 '>
                    <div className='pr-1 md:pr-3 lg:pr-3 pt-1 w-[20%] text-right '>{data.user?.username} :</div> 
                    <div className='p-1 w-[80%]'>
                        {data.ques}
                    </div>    
                </div>
                <div className='flex flex-row p-3 bg-neutral-700'>
                    <div className='pr-1 md:pr-3 lg:pr-3 pt-1 w-[20%] text-right'>PaLM 2 :</div>
                    <div className='p-1 w-[80%]'>
                        <ReactMarkdown>{data.ans}</ReactMarkdown>
                    </div>        
                </div>
            
                <div className='flex items-center justify-end py-2 '>
                    <div className="bg-neutral-600 px-2 py-1 rounded flex items-center justify-center">
                        <Likebutton id={id} token={token} update={getresponse} userId={userId}/>{data.like}
                    </div>
                    {data.user?._id!==userId?<>
                        <button onClick={()=>{saveresponse(data.ques,data.ans,userId)}} className='bg-neutral-600 ml-2'><i><FontAwesomeIcon icon={faSave}></FontAwesomeIcon></i> Save Response</button>
                    </>:<>
                
                    </>}
                
            </div>
            
            </>:<>
            
            </>}
            
        </div>    
        </>
    )
}

export default Response