import { Outlet } from "react-router-dom"
import CartProvider from "../context/CartContext"
import NavBar from "../components/NavBar"


export const Layout = () => {



    return (
        <>
            <CartProvider>
                <NavBar/>

                <Outlet />
            </CartProvider>
        </>
    )
}