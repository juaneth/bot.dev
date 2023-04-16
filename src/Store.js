const storage = window.localStorage

import secureLocalStorage from "react-secure-storage";

export const AddNewBot = (name, path, token) => {
    if (storage.getItem(`bots.${name}`)) {
        throw new Error('Failed: Name Exists Already');
    }

    storage.setItem(`bots.${name}`, JSON.stringify({
        path: path,
    }))

    secureLocalStorage.setItem(`${name}`, token);

    return `Success: Bot Added with name: "${name}", path: "${path}"`
}

export const RemoveBot = (name) => {
    if (!storage.getItem(`bots.${name}`)) {
        throw new Error('Failed: Name Doesnt Exist');
    }

    storage.removeItem(`bots.${name}`)

    secureLocalStorage.removeItem(`${name}`)

    return `Success: Bot Removed with name: "${name}"`
}

export const ManageBot = (name, action, data) => {}