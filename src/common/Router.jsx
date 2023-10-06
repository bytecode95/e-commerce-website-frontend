import Login from '../pages/login/Login.jsx'
import SignUP from '../pages/signup/SignUp.jsx'


const routes = [
    {
        name: "Login",
        key: 'login',
        path: '/login',
        component: <Login/>,
    },
    {
        name: "SignUP",
        key: 'register',
        path: '/signup',
        component: <SignUP/>,
    },



]


export default routes;