import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import LoginForm from "./LoginForm"
import ProductList from "../components/ProductList"
import { useNavigate } from "react-router-dom"

const Home = () => {
    // check if user is logged in with a session.
    // if not present a login and register button. 
    // that will take them to either register screen or login screen.

    // Check if user is authenticated with a session.
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate()

    // Function to handle user authentication.
    const handleAuthentication = (status) => {
        setIsAuthenticated(status);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Simulated fetching user data. You should replace this with your actual API call.
                const response = await fetch("http://localhost:3000/");
                if (!response.ok) {
                    throw new Error("User not found");
                }
                // If user is found, set isAuthenticated to true
                setIsAuthenticated(true);
            } catch (error) {
                // If no user is found, navigate to the login form
                navigate("/loginform")
                console.error("Error fetching user:", error.message);
                setIsAuthenticated(false);
            }
        };

        fetchUserData();
    }, []);






    return (
        <div>
            <Header />
            {isAuthenticated ? <ProductList /> : <LoginForm onAuthentication={handleAuthentication} />}
            <Footer />
        </div>


    )
}

export default Home