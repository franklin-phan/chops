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
        name: "Delete",
        action: openModal
      }]} />

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirm Delete Modal"
      >
        <p>Are you sure you want to delete this post forever?</p>
        <button className="delete-post-button" onClick={() => deleteItem()}>Delete Post</button>
        <button className="" onClick={() => closeModal()}>Cancel</button>
        <div ref={_subtitle => (subtitle = _subtitle)}></div>
      </Modal>
    </div>
  );
}