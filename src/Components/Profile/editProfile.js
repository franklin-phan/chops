import React from "react";

export default function EditProfile(props) {
    const headline = props.headline
    const spotifyLink = props.spotifyLink
    const youtubeLink = props.youtubeLink
    const soundcloudLink = props.soundcloudLink
    const changeSoundcloudLink = props.changeSoundcloudLink
    const changeSpotifyLink = props.changeSpotifyLink
    const changeYoutubeLink = props.changeYoutubeLink
    const bio = props.bio
    const pronoun = props.pronoun
    const displayName = props.displayName
    const changeHeadline = props.changeHeadline
    const changeBio = props.changeBio
    const changePronouns = props.changePronouns
    const changeDisplayName = props.changeDisplayName
    const handleSubmit = props.handleSubmit
    const cancelEdit = props.cancelEdit
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="headline" placeholder="Your headline" onChange={changeHeadline} value={headline} />
                <input type="text" name="bio" placeholder="Your user bio" onChange={changeBio} value={bio} />
                <input type="text" name="pronoun" placeholder="They/Them" onChange={changePronouns} value={pronoun} />
                <input type="text" name="displayName" placeholder="Change Display Name" onChange={changeDisplayName} value={displayName} />
                <input type="text" name="spotifyLink" placeholder="Change Spotify Link" onChange={changeSpotifyLink} value={spotifyLink} />
                <input type="text" name="soundcloudLink" placeholder="Change Soundcloud Link" onChange={changeSoundcloudLink} value={soundcloudLink} />
                <input type="text" name="youtubeLink" placeholder="Change Youtube Link" onChange={changeYoutubeLink} value={youtubeLink} />
                <button>Save Profile</button>
                <button type="button" onClick={() => cancelEdit()}>Cancel</button>
            </form>
        </div>
    )
}