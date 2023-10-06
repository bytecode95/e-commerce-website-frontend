import './App.css'
import NavBar from '../components/header/Navbar.jsx'
import {Route, Routes, Navigate} from "react-router-dom";
import routes from '../common/Router.jsx'
import settings from '../common/NavRouters.jsx'
import ProductDetails from "../pages/productdetails/ProductDetails.jsx";
import CartContent from '../pages/cartContent/CartContent.jsx'
import OrderDetails from '../pages/orderinfor/OrderInfo.jsx'
import Footer from '../components/footer/Footer.jsx'
import {useEffect, useLayoutEffect, useState} from "react";
import Home from '../pages/home/Home.jsx'
import PalceOrder from '../pages/PlaceOrder/PlaceOrder.jsx'
import PrivateRoutes from '../common/PrivateRoutes.jsx'


const cartFromlocalStorage = JSON.parse(localStorage.getItem('cartItems') || '[]')

function App() {

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            return <Route exact path={route.path} element={route.component} key={route.key}/>;
        });

    useLayoutEffect(() => {
        document.body.style.backgroundColor = '#f7f7f7'
    });


    //user login and logout
    const [cartItems, setCartItems] = useState(cartFromlocalStorage);   //cart items state declare
    const [warning, setWarning] = useState(false);
    // const [view, setView] = useState(false)


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

    }, [cartItems]);

    //adding removing and quantity calculation in cart
    const addtoCart = (product) => {

        const ProductExist = cartItems.find((val) => val.id === product.id)

        if (!ProductExist) {
            setCartItems([...cartItems, {...product, nProduct: 1}])
        } else {
            setWarning(true)
            setTimeout(() => {
                setWarning(false);
            }, 2000);
        }
    }

    const updateCart = (item, amount) => {
        const ProductExist = cartItems.find((val) => val.id === item.id)
        if (ProductExist) {
            setCartItems(cartItems.map((val) => val.id === item.id ?
                {...ProductExist, nProduct: ProductExist.nProduct + parseInt(amount)} : val)
            );
        } else {
            setCartItems([...cartItems, {...item, nProduct: parseInt(amount)}])
        }
    }

    const adding = (item) => {
        const ProductExist = cartItems.find((val) => val.id === item.id);
        if (ProductExist) {
            setCartItems(cartItems.map((val) => val.id === item.id ?
                {...ProductExist, nProduct: ProductExist.nProduct + 1} : val)
            );
        } else {
            setCartItems([...cartItems, {...item, nProduct: 1}])
        }

    }

    const removing = (item) => {
        const ProductExist = cartItems.find((val) => val.id === item.id);
        if (ProductExist.nProduct === 1) {
            setCartItems(cartItems.filter((x) => x.id !== item.id));
        } else {
            setCartItems(cartItems.map((val) => val.id === item.id ? {
                ...ProductExist,
                nProduct: ProductExist.nProduct - 1
            } : val))
        }
    }




    return (
        <>

            <NavBar cartItems={cartItems} warning={warning}/>
            <Routes>
                {getRoutes(routes)}
                {getRoutes(settings)}
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
                <Route path={'/'} exact element={<Home addtoCart={addtoCart}/>}/>
                <Route path={'/productdetails/:id'} element={<ProductDetails updateCart={updateCart}/>}/>
                <Route path={'/cartcontent'} element={<CartContent cartItems={cartItems} setCartItems={setCartItems} updateCart={updateCart}
                                             adding={adding} removing={removing}/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path={'/orderinfo'} exact element={<OrderDetails/>}/>
                    <Route path={'/placeorder'} cartItems={cartItems} element={<PalceOrder/>}/>
                </Route>
            </Routes>
            <Footer/>
        </>
    )
}

export default App
