import React from 'react';
import Modal from 'react-modal';

import { auth, provider } from './google-signin'

import SignUp from './SignUp'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default function SignUpModal() {

    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function login() {
        auth.signInWithRedirect(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }
    function openModal() {
        setIsOpen(true);

    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Sign Up</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <SignUp />
                <div ref={_subtitle => (subtitle = _subtitle)}></div>
                <button onClick={closeModal}>Cancel</button>
                <button onClick={login}>Sign Up With Google</button>
            </Modal>
        </div>
    );
}
