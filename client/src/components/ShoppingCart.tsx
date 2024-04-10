import Header from "./Header"
import ProductList from "./ProductList"
import CartProvider from "../context/CartContext"

const ShoppingCart = () => (
    <CartProvider>
        <Header />
        <ProductList />
    </CartProvider>
)

export default ShoppingCart