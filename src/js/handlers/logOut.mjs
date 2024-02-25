import { logout } from "../api/auth/logout.mjs"

export function setLogoutListener() {
    const logoutButton = document.querySelector("#signoutButton")
    
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault () 
        console.log('signoutButton clicked')
        logout()
    })
}
