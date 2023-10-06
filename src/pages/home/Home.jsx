import HeroCaresoul from '../../components/hero/HeroCaresoul.jsx'
import ShopSection from '../../components/shopsection/ShopSection.jsx'


export default function Home({addtoCart, cartItems}){

    return (
        <div>
            <HeroCaresoul/>
            <ShopSection addtoCart={addtoCart} cartItems={cartItems}  />
        </div>
    )
}