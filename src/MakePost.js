import React from 'react'

export default function MakePost (props) {
    const nameValue = props.nameValue;
    const postValue = props.postValue
    const handleChange = props.handleChange
    const handleSubmit =props.handleSubmit
    return(
        <section className='add-item'>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="What's your name?" value={nameValue} />
          <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={handleChange} value={postValue} />
          <button>Add Item</button>
        </form>
      </section>
    )
}