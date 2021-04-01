import React from 'react';
import Modal from 'react-modal';
import { auth, provider } from '../../google-signin'
import SignUp from './SignUp'
import './Auth.css'

const customStyles = {
  overlay: {
    background: "#0009"
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxWidth: '90%',
    borderRadius: '10px'
  }
};

export default function SignUpModal() {

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function signup() {
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
    <div className="centered-flex-row">
      <button onClick={openModal}>Sign Up</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Sign Up Modal"
      >
        <SignUp cancel={closeModal} oauth={signup} />
        <div ref={_subtitle => (subtitle = _subtitle)}></div>
      </Modal>
    </div>
  );
}
