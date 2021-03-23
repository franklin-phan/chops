import React from 'react';
import Modal from 'react-modal';

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

export default function UpdateFieldModal(props) {
    const {data, changeData, handleSubmit, name} = props
    // console.log(data)
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
    <div>
        <div onClick={() => openModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#333"><path d="M8.424 12.282l4.402 4.399-5.826 1.319 1.424-5.718zm15.576-6.748l-9.689 9.804-4.536-4.536 9.689-9.802 4.536 4.534zm-6 8.916v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023z" /></svg>
        </div>

        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Edit Profile Modal"
        >
            <form onSubmit={(e) => {
              closeModal()
              handleSubmit(e, name, data)
            }} id="form1">
                <input type="text" name="Update" placeholder="Update Field" onChange={changeData} value={data} />
                <button type="submit" form="form1" value="Submit" className="">Update</button>
                <button className="" onClick={(e) => {
                    e.preventDefault()
                    closeModal()
                    }}>Cancel</button>
            </form>
            <div ref={_subtitle => (subtitle = _subtitle)}></div>
      </Modal>
    </div>
  );
}