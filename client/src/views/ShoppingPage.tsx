import CartProvider from "../context/CartContext"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ProductList from "../components/ProductList"


const ShoppingPage = () => {
    return (
        <CartProvider>
            <Header />
            <ProductList />
            <Footer />
        </CartProvider>
    )
}

export default ShoppingPage