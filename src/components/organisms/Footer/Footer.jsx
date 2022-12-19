import React from 'react'
import './Footer.css'

function Footer(){
    return(
        <footer className='footer-container'>
            <p className="fw-700 fc-white">&copy;{new Date().getFullYear()} Digital Booking</p>
            <ul className='social-container'>
                <li>
                <a href={'https://www.facebook.com'} target="_blank" rel="noreferrer">
                    <img src="/images/icons/facebook.svg" alt="facebook" />
                </a>
                </li>
                <li>
                    <a href={'https://www.linkedin.com/'} target="_blank" rel="noreferrer">
                    <img src="/images/icons/linkedin.svg" alt="linkedin" />
                    </a>
                </li>
                <li>
                    <a href={'https://twitter.com/'} target="_blank" rel="noreferrer">
                    <img src="/images/icons/twitter.svg" alt="twitter" />
                    </a>
                </li>
                <li>
                    <a href={'https://www.instagram.com'} target="_blank" rel="noreferrer">
                    <img src="/images/icons/instagram.svg" alt="instagram" />
                    </a>
                </li>
            </ul>
        </footer>

    );
}

export default Footer;