export function setData(context, key, save) {
    setKey(context, key);
    setSave(context, save);
}

function setKey(context, key) {
    if (getSave(context)) {
        context.$store.commit("setKey", key)
    } else {
        setSessionCookie("key", key);
    }
}

function setSave(context, save) {
    context.$store.commit("setSave", save)
}

export function setPopup(context, seenPopup) {
    context.$store.commit("setPopup", seenPopup)
}

export function getKey(context) {
    if (getSave(context)) {
        return context.$store.getters.key
    } else {
        return getSessionCookie("key");
    }
}

export function getSave(context) {
    return context.$store.getters.save
}

export function getSeenPopup(context) {
    return context.$store.getters.seenPopup
}

function setSessionCookie(name, value) {
    document.cookie = `${name}=${value}; path=/;SameSite=None;`;
}

function getSessionCookie(name) {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return "";
}