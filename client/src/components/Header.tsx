import { BsCart4 } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import "../styles/Header.css"

const Header = () => {
    const { cart } = useCart()

    return (
        <div className="header">
            <h1>SomeApp</h1>
            <div className="cart">
                <BsCart4 />
                <p>{cart.length}</p>
            </div>
        </div>
    )
}

export default Header