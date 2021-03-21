import React from "react";

export default function EditProfile(props) {
    const bio = props.bio
    const pronoun = props.pronoun
    const displayName = props.displayName
    const changeBio = props.changeBio
    const changePronouns = props.changePronouns
    const changeDisplayName = props.changeDisplayName
    const handleSubmit = props.handleSubmit
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="bio" placeholder="Your user bio" onChange={changeBio} value={bio} />
                <input type="text" name="pronoun" placeholder="They/Them" onChange={changePronouns} value={pronoun} />
                <input type="text" name="displayName" placeholder="Change Display Name" onChange={changeDisplayName} value={displayName} />
                <button>Save Profile</button>
            </form>
        </div>
    )
}