import React from 'react';

import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'

function Homepage() {
    return (
        <div className='homepage-wrapper'>
            <div className='hero-image-container'>
                <p>test</p>
            </div>
            <div className='hero-auth-container'>
                <div className='hero-auth-page'>
                    <p className="text-center header-text">Jam Session</p>
                    <p className="p0 m0">Make More Than Just Music</p>

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