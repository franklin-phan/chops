import React from 'react';
import SignUpModal from '../../Components/Authentication/SignUpModal'
import SignInModal from '../../Components/Authentication/SignInModal'
import VaporWaveLogo from '../../Components/Utils/VaporWaveLogo/VaporWaveLogo'
import './Homepage.css'

function Homepage() {
  return (
    <section className="homepage-section">
      <div className='homepage-wrapper'>
        <div className='hero-image-container'>
          <VaporWaveLogo />
        </div>
        <div className='hero-auth-container'>
          <div className='hero-auth-page'>
            <p className="text-light text-center header-text hero-brand">Jam Session</p>
            <p className="text-light slogan-text">Make More Than Just Music</p>

            <div className="auth-modal">
              <SignUpModal />
              <SignInModal />
            </div>
          </div>
        </div>
        <div className="footer text-light">
          <div>&#169; Jam Session 2021</div>
        </div>
      </div>
    </section>

  )
}

export default Homepage