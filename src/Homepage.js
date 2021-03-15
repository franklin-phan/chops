import React from 'react';

import SignUpModal from './SignUpModal'
import SignInModal from './SignInModal'
function Homepage(){
    return(
        <div className='wrapper'>
        <p>You must be logged in to see posts and submit to it.</p>
        <SignUpModal />
        <SignInModal />
        </div>
    )
}

export default Homepage