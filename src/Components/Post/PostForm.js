import React from 'react'

export default function PostForm(props) {
    const title = props.title
    const songLink = props.songLink
    const changeTitle = props.changeTitle
    const changeSongLink = props.changeSongLink
    const handleSubmit = props.handleSubmit
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input type="text" name="currentItem" placeholder="Title of Song" onChange={changeTitle} value={title} />
                <input type="text" name="linkValue" placeholder="Link" onChange={changeSongLink} value={songLink} />
                <button>Add Item</button>
            </form>
        </section>
    )
}