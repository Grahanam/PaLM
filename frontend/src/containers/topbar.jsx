
import Cookies from 'universal-cookie'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const Topbar=({username,open,setopen})=>{
    const cookies=new Cookies()
    const navigate=useNavigate()

    const logout=()=>{
        cookies.remove('TOKEN')
        cookies.remove('USER')
        cookies.remove('USERID')
        cookies.remove('FULLNAME')
        navigate('/auth',{replace:true})
    }

    return(
        <>
        <div className="w-full h-[10%] flex flex-row justify-between items-center px-3">
        <button className='py-1 md:hidden lg:hidden'><i className='md:hidden lg:hidden' onClick={()=>setopen(!open)}><FontAwesomeIcon icon={faBars}/></i></button>
            <h3 className="hidden md:flex lg:flex">Hi,{username}</h3>
            <div className="flex items-center justify-center w-full">
               Model : PaLM 2
            </div>
            <button onClick={logout} className="p-1 bg-neutral-600 ml-2">Logout</button>
          
            
        </div>
        </>
    )
}

export default Topbar