import {Link,useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useNavigate} from 'react-router-dom'
import {faBars, faBookBookmark, faCheck, faChevronLeft, faChevronRight, faHandPaper, faLock, faLockOpen, faMedal, faNewspaper, faPenToSquare, faPlus, faStar, faTrash} from '@fortawesome/free-solid-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons'




const Nav=({data,update,token,open,setopen})=>{
    const {id}=useParams()
    const navigate=useNavigate()
    // const [data,setdata]=useState([])
    // const [open,setopen]=useState(false)
    // const [progress,setprogress]=useState([])
    
    const deleteresponse=(id)=>{
      fetch(`http://localhost:4000/${id}`,{
        method:'DELETE',
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json",
          "Authorization":token
        }
      }).then(response=>response.json())
      .then(response=>{
        update()
        alert(response.message)
        navigate('/')
      })
      .catch(err=>{
        alert(err.message)
      })
    }

    useEffect(()=>{

      
    },[])

    return(
        <>
         {/* large screen view */}
          <div className='hidden md:flex lg:flex flex-col md:w-[30%] lg:w-[20%] h-[100vh] bg-neutral-900 p-2'>
            <Link to='/'><div className='text-xl text-neutral-200 p-2 mt-4 hover:bg-neutral-800 border border-neutral-400 rounded'> <i className='text-neutral-400'><FontAwesomeIcon icon={faPlus}/> </i> New Story</div></Link>
            <Link to='/leaderboard'><div className='text-xl text-neutral-200 p-2 mt-4 hover:bg-neutral-800 border border-neutral-400 rounded'> <i className='text-neutral-400'><FontAwesomeIcon icon={faStar}/> </i> Leaderboard</div></Link>
            <div className='p-2 mt-4 text-xl text-left border-b-2 border-neutral-400 text-neutral-200'><i className='text-neutral-400'><FontAwesomeIcon icon={faBookBookmark}/></i>  Your Stories</div>
            <ul className=' overflow-auto'>
              {data.length>0?<>
                {data.map((response,index)=>(
                       <li key={index} className='p-2 mt-4 md:text-lg lg:text-xl hover:bg-neutral-800 rounded text-left'>
                        <div className='flex flex-row justify-between p-1 text-neutral-300'>
                          <Link className='truncate ' to={`/${response._id}`}>
                            <span className='text-neutral-200'>{response.ques}</span>
                          </Link>
                        <div>
                        <i onClick={()=>deleteresponse(response._id)} className='color-green-500 pr-1 hover:cursor-pointer text-neutral-400'><FontAwesomeIcon icon={faTrash}/></i>
                       </div>
                       </div>
                       
                     </li>
                ))}
                
                </>:<>
                </>}
            </ul>
            </div>
            {/* mobile screen view */}
            {open?<>
            <div className='absolute md:hidden lg:hidden w-full px-1 z-10 t-2 l-2 bg-neutral-900'>
            <div className='flex flex-col h-[100vh]'>
            <div className='flex flex-row justify-center items-center'>
            <Link className='w-full' onClick={()=>setopen(!open)} to='/'><div className='text-xl text-neutral-200 p-2 mt-4 hover:bg-neutral-800 border border-neutral-400 rounded'> <i className='text-neutral-400'><FontAwesomeIcon icon={faPlus}/> </i> New Story</div></Link>
            <button className='py-1 '><i className='' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faBars}/></i></button>
            </div>
            
            <Link onClick={()=>setopen(!open)} to='/leaderboard'><div className='text-xl text-neutral-200 p-2 mt-4 hover:bg-neutral-800 border border-neutral-400 rounded'> <i className='text-neutral-400'><FontAwesomeIcon icon={faStar}/> </i> Leaderboard</div></Link>

            <div className='p-2 mt-4 text-xl text-left border-b-2 border-neutral-400 text-neutral-200'><i className='text-neutral-400'><FontAwesomeIcon icon={faBookBookmark}/></i>  Your Stories</div>
         
            
            <ul className=' overflow-auto'>  
                {data.length>0?<>
                {data.map((response,index)=>(
                       <li key={index} className='p-2 mt-4 text-lg md:text-lg lg:text-xl hover:bg-neutral-800 rounded text-left'>
                        <div className='flex flex-row justify-between p-1 text-neutral-300'>
                          <Link onClick={()=>setopen(!open)} className='truncate ' to={`/${response._id}`}>
                            <span className='text-neutral-200'>{response.ques}</span>
                          </Link>
                        <div>
                        <i onClick={()=>{deleteresponse(response._id)
                                          setopen(!open)
                        }} className='color-green-500 pr-1 hover:cursor-pointer text-neutral-400'><FontAwesomeIcon icon={faTrash}/></i>
                       </div>
                       </div>
                       
                     </li>
                ))}
                
                </>:<>
                </>}
              
                
            </ul>
            </div>
              
            </div>
            </>:<>
            
            </>}
        </>
    )
}

export default Nav