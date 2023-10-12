import CartContent from '../pages/cartContent/CartContent.jsx'
import LockIcon from "@mui/icons-material/Lock.js";
import OrderDetails from "../pages/orderinfor/OrderInfo.jsx";

//this is for sidebar
const routes = [
    {
        name:'View Cart',
        key: 'cartcontent',
        path: '/cartcontent',
        backgroundColor:'#f9ad02',
        component: <CartContent/>,
        icon:''
    },
    {
        name:'Checkout',
        key: 'orderinfo',
        path: '/orderinfo',
        backgroundColor:'#000000',
        component: <OrderDetails/>,
        icon: <LockIcon/>
    },

]


export default routes;