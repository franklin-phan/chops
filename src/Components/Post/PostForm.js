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
                <input type="text" name="currentItem" placeholder="Share your music" onChange={changeTitle} value={title} />
                <input type="text" name="linkValue" placeholder="SoundCloud, Spotify, or YouTube" onChange={changeSongLink} value={songLink} />
                <button>Post</button>
            </form>
        </section>
    )
}