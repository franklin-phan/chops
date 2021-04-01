import React from 'react';
import Modal from 'react-modal';
import './FollowerModal.css'

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

export default function FollowerModal(props) {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="centered-flex-row">
      <div className="openFollowModalButton" onClick={openModal}>{props.modalName}: {props.users.length}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Follows Modal"
      >
        <div>
          <div className="spaced-flex-row">
            <h3 className="auth-header auth-header-small">{props.modalName}</h3>
            <button type="button" className="close-modal" onClick={closeModal}>X</button>
          </div>
          <div className="followerListContainer">
            {props.users ? <ul> {props.users.map((tuple) => {
              return (
                <li className="m-0">
                  <a className="text-dark user-follow-snippet" href={`/profile/${tuple[1]}`}>
                    <div className="user-profile">
                      <img src={tuple[2]} />
                    </div>
                    <p>{tuple[0]}</p>
                  </a>
                </li>
              )
            })}</ul> : <p>{props.empty}</p>}
          </div>
        </div >
      </Modal>
    </div>
  );
}