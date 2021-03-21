export function userLoggedIn(user) {
    if (user) {
        return true
    }
    return false
}

export function userIsOwner(user, ownerUID) {
    if (user) {
        if (user.uid === ownerUID) {
            return true
        }
        return false
    }
}