import { Link } from 'react-router-dom';

const NavBar = () => {


    
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                {/* Add more links here as needed */}
            </ul>
        </nav>
    );
}


export default NavBar