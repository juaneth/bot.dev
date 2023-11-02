const storage = window.localStorage

import secureLocalStorage from "react-secure-storage";

export const AddNewBot = (botName, clientID, path, token) => {
    let bots = JSON.parse(window.localStorage.getItem('bots'))

    bots.forEach(function(item, index) {
        if (item.name == botName) {
            throw new Error('Failed: Name Exists Already');
        }

    });

    bots.push({
        name: botName,
        path: path,
        clientID: clientID,
        invites: []
    })

    storage.setItem(`bots`, JSON.stringify(bots))

    secureLocalStorage.setItem(`${botName}`, token);

    return `Success: Bot Added with name: "${botName}", path: "${path}"`
}

export const RemoveBot = (botName) => {
    let bots = JSON.parse(window.localStorage.getItem('bots'))

    bots.forEach(function(item, index) {
        if (item.name == botName) {
            bots.splice(index, 1);

            secureLocalStorage.removeItem(botName)

            storage.setItem(`bots`, JSON.stringify(bots))
        }
    });

    return `Success: Bot Removed with name: "${botName}"`
}

export const ManageBot = (botName, action, data) => {
    let bots = JSON.parse(window.localStorage.getItem('bots'))

    bots.forEach(function(item, index) {
        if (item.name == botName) {
            if (action == "rename") {
                bots[index].name = data

                storage.setItem(`bots`, JSON.stringify(bots))

                return `Success: Bot "${botName}" renamed to: "${data}"`
            }

            if (action == "setClientID") {
                bots[index].clientID = data

                storage.setItem(`bots`, JSON.stringify(bots))

                console.log(`Success: Set "${botName}".clientID to: "${data}"`)

                return `Success: Set "${botName}".clientID to: "${data}"`
            }
        }
    });
}