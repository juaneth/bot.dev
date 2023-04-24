import * as Store from "./Store";

const { exec } = require("child_process");

import secureLocalStorage from "react-secure-storage";

export const startBot = (botName, setTerminal) => {
    let bots = JSON.parse(window.localStorage.getItem('bots'))

    bots.forEach(function(item, index) {
        console.log(item)

        if (item.name == botName) {
            let bot = exec(`npx cross-env DISCORD_TOKEN=\"${secureLocalStorage.getItem(botName)}\" node index.js`, {
                cwd: item.path,
            });

            bot.stdout.on('data', function(data) {

            });
        }
    });
}

export const stopBot = (name) => {}