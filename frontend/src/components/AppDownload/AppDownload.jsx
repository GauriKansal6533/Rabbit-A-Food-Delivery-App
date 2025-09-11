import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className="app-download">
  Get the Rabbit App Now
  <div className="app-download-subtext">
    Fast, hot, and delicious—download and hop to it!
  </div>
  <div className="app-download-platforms">
    <img src={assets.play_store} alt="Download on Play Store" />
    <img src={assets.app_store} alt="Download on App Store" />
  </div>
</div>
      )
    }
    
    export default AppDownload