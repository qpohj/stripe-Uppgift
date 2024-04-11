import CartProvider from "../context/CartContext"
import Header from "./Header"
import ProductList from "./ProductList"


const ShoppingCart = () => {
    return (
        <CartProvider>
            <Header />
            <ProductList />
        </CartProvider>
    )
}

export default ShoppingCart