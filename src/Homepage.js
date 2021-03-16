import React from 'react';

import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'

function Homepage() {
    return (
        <section class="homepage-section">
            <div className='homepage-wrapper'>
                <div className='hero-image-container'>
                    <div class="scene">
                        <div class="vaporwave-container">
                            <div class="sun"></div>
                            <div class="band" style={{ animationDelay: "-0s" }}></div>
                            <div class="band" style={{ animationDelay: "-1s" }}></div>
                            <div class="band" style={{ animationDelay: "-2s" }}></div>
                            <div class="band" style={{ animationDelay: "-3s" }}></div>
                            <div class="band" style={{ animationDelay: "-4s" }}></div>
                            <div class="band" style={{ animationDelay: "-5s" }}></div>
                            <div class="band" style={{ animationDelay: "-6s" }}></div>
                            <div class="band" style={{ animationDelay: "-7s" }}></div>
                            <div class="band" style={{ animationDelay: "-8s" }}></div>
                            <div class="band" style={{ animationDelay: "-9s" }}></div>
                        </div>
                    </div>
                </div>
                <div className='hero-auth-container'>
                    <div className='hero-auth-page'>
                        <p className="text-light text-center header-text">Jam Session</p>
                        <p className="text-light slogan-text">Make More Than Just Music</p>

                        <div className="auth-modal">
                            <SignUpModal />
                            <SignInModal />
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div>Copyright something or other</div>
                </div>
            </div>
        </section>

    )
}

export default Homepage