import { load } from "../storage/index.mjs";

const profileNav = document.querySelector("#profileNav");

function isLoggedIn() {
    return load("token") !== null;
}

export function setRequireLoginListener() {
    if (!isLoggedIn()) {
        profileNav.innerText = "Log In";
        profileNav.setAttribute("href", "/profile/login");
    } else {
        profileNav.innerText = "Profile";
        profileNav.setAttribute("href", "/profile");
    }
}
