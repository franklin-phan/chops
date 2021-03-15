import React from 'react'

export default function MakePost (props) {
    const nameValue = props.nameValue;
    const postValue = props.postValue
    const handleChange = props.handleChange
    const handleSubmit =props.handleSubmit
    const linkValue = props.linkValue
    return(
        <section className='add-item'>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="What's your name?" value={nameValue} />
          <input type="text" name="currentItem" placeholder="Title of Song" onChange={handleChange} value={postValue} />
          <input type="text" name="linkValue" placeholder="Link" onChange={handleChange} value={linkValue} />

          <button>Add Item</button>
        </form>
      </section>
    )
}