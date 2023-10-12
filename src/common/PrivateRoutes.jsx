import {Navigate, Outlet} from 'react-router-dom'

//user need to login before placing an order
const PrivateRoutes = () => {
    const auth = localStorage.getItem('token')
    return(
        auth ? <Outlet/> : <Navigate to={'login'}/>
    )
}

export default PrivateRoutes;