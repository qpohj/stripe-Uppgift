import { BsCart4 } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import "../styles/Header.css"
import Confirmation from "./Confirmation";

const Header = () => {
    const { cart } = useCart()


    const goToCartPage = () => {
        // bring user to page with {cart} products shown.
        // redirect to confirmation

    }

    return (
        <div className="header">
            <h1>SomeApp</h1>
            <div className="cart">
                <BsCart4 />
                <p>{cart.length}</p>
                <button onClick={<Confirmation />}>Go to Cart</button>
            </div>
        </div>
    )
}

export default Header