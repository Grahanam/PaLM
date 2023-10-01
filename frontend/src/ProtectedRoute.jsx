import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'



const ProtectedRoute=({children})=>{
    const cookies=new Cookies()
    const token=cookies.get("TOKEN")
    return(
        <> 
           {token?children:<Navigate to="/auth"/>}
        </>
    )
}


export default ProtectedRoute