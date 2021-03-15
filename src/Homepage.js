import React from 'react';

import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'

function Homepage() {
    return (
        <div className='homepage-wrapper'>
            <div className='hero-image-container'>
            </div>
            <div className='hero-auth-container'>
                <div className='hero-auth-page'>
                    <p className="text-center header-text text-light">Jam Session</p>
                    <p className="text-light slogan-text">Make More Than Just Music</p>

                    <div className="auth-modal">
                        <SignUpModal />
                        <SignInModal />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Homepage