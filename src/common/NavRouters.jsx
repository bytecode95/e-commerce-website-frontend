import UserProfile from '../pages/userprofile/UserProfile.jsx'
import Home from '../pages/home/Home.jsx'

//user profile and logout
const settings = [
    {
        name: "Profile",
        key: 'profile',
        path: '/myProfile',
        component: <UserProfile/>,

    },
    // {
    //     name: "Logout",
    //     key: 'logout',
    //     path:'/',
    //     component: <Home />
    // },

]

export default settings;