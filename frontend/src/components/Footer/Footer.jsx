import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
        <div className="footer-content-left">
<h2>RABBIT</h2>
<p>Rabbit delivers your favorite meals faster than you can hop! Enjoy restaurant-quality food at your doorstep with lightning-speed delivery. Order now and let Rabbit take care of your cravings!</p>
    <div className="footer-social-icons">
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.linkedin_icon} alt="" />
        
    </div>
    </div>
    <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>PrivacyPolicy</li>
        </ul>

    </div>
    <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+1-212-456-789</li>
            <li>contact@rabbit.com</li>
        </ul>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />

    </div>
</div>
<hr/>
<p className="footer-copyright">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners
2008-2025 © Rabbit™ Ltd. All rights reserved.</p>
    </div>
  )
}

export default Footer
       