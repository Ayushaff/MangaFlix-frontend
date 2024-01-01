import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div>
            <div>
                <Link to='/' >Privacy Policy</Link>
                <Link to='/' >Contact Us</Link>
                <Link to='/' >Terms of Service</Link>
            </div>
            <div>
                MANGAFLIX
            </div>
        </div>
    );
}

export default Footer;