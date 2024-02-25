import * as listeners from "./handlers/index.mjs";

export default function router() {
    console.log('Router function called');
    const path = location.pathname;

    listeners.setRequireLoginListener();

    switch (path) {
        case '/index.html':
        case '/listings/':
            listeners.setDisplayListingsListener();
            break;
        case '/listings/listing/':
            listeners.setDisplayListingListener();
            listeners.setBidListener();
            break;
        case '/profile/login/':
            listeners.setLoginFormListener();
            break;
        case '/profile/register/':
            listeners.setRegisterFormListener();
            break;
        case '/listing/create/':
            listeners.setCreatePostFormListener();
            break;
        case '/profile/':
            listeners.setLogoutListener();
            listeners.setDisplayProfileListener();
            break;
        case '/profile/edit/':
            listeners.setUpdateProfileListener();
            break;
        case '/profile/edit/listing/':
            listeners.setUpdatePostListener();
            break;
    }
}
