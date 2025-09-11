import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="background-video-wrapper">
        <video className='background-video' autoPlay muted loop playsInline>
          <source src="/HeaderVideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="header-overlay">
        <div className="header-contents">
          <h2>Fast. Fresh. Delivered.</h2>
          <p>Delicious meals at your doorstep — hot and ready to eat!</p>
          <button className='cta-btn'>Order Now</button>

          {/* Scroll down arrow */}
          <div className="scroll-down">
            <a href="#next-section">&#x25BC;</a> {/* Unicode for Down Arrow */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
