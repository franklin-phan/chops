import React from 'react';

import SignUpModal from '../Components/Authentication/SignUpModal'
import SignInModal from '../Components/Authentication/SignInModal'

function Homepage() {
    return (
        <section className="homepage-section">
            <div className='homepage-wrapper'>
                <div className='hero-image-container'>
                    <div className="scene">
                        <div className="vaporwave-container">
                            <div className="sun"></div>
                            <div className="band" style={{ animationDelay: "0s" }}></div>
                            <div className="band" style={{ animationDelay: "-1s" }}></div>
                            <div className="band" style={{ animationDelay: "-2s" }}></div>
                            <div className="band" style={{ animationDelay: "-3s" }}></div>
                            <div className="band" style={{ animationDelay: "-4s" }}></div>
                            <div className="band" style={{ animationDelay: "-5s" }}></div>
                            <div className="band" style={{ animationDelay: "-6s" }}></div>
                            <div className="band" style={{ animationDelay: "-7s" }}></div>
                            <div className="band" style={{ animationDelay: "-8s" }}></div>
                            <div className="band" style={{ animationDelay: "-9s" }}></div>
                            <div className="band" style={{ animationDelay: "-10s" }}></div>
                            <div className="band" style={{ animationDelay: "-11s" }}></div>
                            <div className="band" style={{ animationDelay: "-12s" }}></div>
                            <div className="band" style={{ animationDelay: "-13s" }}></div>
                        </div>
                    </div>
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