import { faAngleDoubleRight, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState,useEffect} from 'react'
import ReactMarkdown from 'react-markdown'

import LoadingAnimation from '../components/loading'
const API_BASE_URL=import.meta.env.VITE_BASE_URL


const Main=({update,userId,username,token})=>{
    const [prompt,setprompt]=useState('')
    const [ques,setques]=useState('')
    const [ans,setans]=useState('')
    const [loading,setloading]=useState(false)

    const example=['In a city where everyone can fly...','Once upon a time in a digital world...']

    const getresponse=()=>{
        
        setloading((prevloading) => !prevloading);
        // console.log(prompt)
        if(prompt!=''){
            fetch(`${API_BASE_URL}`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    "Authorization":token
                },
                body:JSON.stringify({prompt:prompt})
            }).then((response)=>response.json())
            .then((response)=>{
                // console.log(response.data.candidates[0].output)
                setques(prompt)
                setans(response.data.candidates[0].output)
                setloading((prevloading) => !prevloading);
            }).catch((err)=>{
                setloading((prevloading) => !prevloading);
                console.log(err)
            })
        }
    }

    const saveresponse=()=>{
        console.log('userid',userId)
        fetch(`${API_BASE_URL}/save`,{
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify({ques:ques,ans:ans,user:userId})
        }).then((response)=>response.json())
        .then(response=>{
            // console.log(response)
            update()
            alert(response.message)
        }).catch(err=>{
            console.log(err)
        })
    }

    const tryexample=(ques)=>{
        setloading((prevloading) => !prevloading);
        setprompt(ques)
        fetch(`${API_BASE_URL}`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                "Authorization":token
            },
            body:JSON.stringify({prompt:ques})
        }).then((response)=>response.json())
        .then((response)=>{
            // console.log(response.data.candidates[0].output)
            setques(ques)
            setans(response.data.candidates[0].output)
            setloading((prevloading) => !prevloading);
        }).catch((err)=>{
            console.log(err)
            setloading((prevloading) => !prevloading);
        })
          
    }
    return(
        <>
           <div className='h-[80%]  overflow-auto pr-3'>
                <div className='h-[80%] text-[12px] md:text-md lg:text-md'>
                    {ans?<>
                        <div className='flex flex-row p-1 md:p-3 lg:p-3'>
                            <div className='pr-3 pt-1 w-[20%] text-right'>{username} :</div> 
                            <div className='p-1 w-[80%]'>
                                {ques}
                            </div>
                            
                        </div>
                        <div className='flex flex-row p-3 bg-neutral-700'>
                            <div className='pr-3 pt-1 w-[20%] text-right'>PaLM 2 :</div>
                            <div className='p-1 w-[80%]'>
                                <ReactMarkdown>{ans}</ReactMarkdown>
                            </div>
                        </div>
                        <div className='flex items-center justify-end py-2 '>
                            <button className='bg-neutral-600' onClick={saveresponse}><i><FontAwesomeIcon icon={faSave}></FontAwesomeIcon></i> Save Response</button>
                        </div>
                    </>:<>
                    <div className='h-full'>
                        <div className='h-[80%] flex flex-col items-center justify-center'>
                       <h1 className='text-neutral-400 text-5xl font-bold'>PaLM</h1>
                       <span className='text-neutral-400'>Your Storyteller</span>
                       </div>
                       <div className='h-[30%] px-9'>
                       <div className='w-full flex flex-col md:flex-row lg:flex-row justify-evenly'>
                            {example.map((eg,index)=>(
                                <div key={index} onClick={()=>tryexample(eg)} className='p-2 border border-neutral-400 rounded hover:cursor-pointer hover:bg-neutral-700 flex flex-row mb-2'><div className='truncate'>{eg}</div> <i className=''><FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon></i></div>
                            ))}
                       </div>
                    </div>

                    </div>
                    
                    </>}
                </div>
            </div>
           <div className='h-[10%] p-1 md:p-3 lg:p-3 flex items-center justify-center'>
            <div className='w-full md:w-[80%] lg:w-[80%] flex items-center justify-between bg-neutral-700 rounded'>
               <input className='w-full p-3' type="text" value={prompt} placeholder='Prompt' onChange={e=>{setprompt(e.target.value)}}/>
               <div className='px-3'>
               {loading?<>
                   <LoadingAnimation/>
               </>:<>
               <i className='text-3xl hover:cursor-pointer text-green-500' onClick={getresponse}><FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon></i>
               </>}
               </div>
               
            </div>
               
           </div>
        </>
    )
}

export default Main