import React from 'react';
import Modal from 'react-modal';
import DropDownMenu from '../Utils/DropDownMenu'

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

export default function SignInModal(props) {
  const deleteItem = props.deleteItem

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
    <div className="delete-post-container">
      <DropDownMenu menuColor="#000" actions={[{
        name: "Delete Post",
        action: openModal
      }]} />

      {/* <button className="delete-post-button" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" /></svg>
      </button>
      <div className="navbar-dropdown">
        <div className="navbar-dropdown-item" onClick={openModal}>Delete Post</div>
      </div> */}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <button className="delete-post-button" onClick={() => deleteItem()}>Delete Post</button>
        <div ref={_subtitle => (subtitle = _subtitle)}></div>
      </Modal>
    </div>
  );
}