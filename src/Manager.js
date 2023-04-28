import * as Store from "./Store";

const pm2 = require('pm2')
const path = require('node:path')

import secureLocalStorage from "react-secure-storage";

export const startBot = (botName, terminal, setTerminal) => {
    let bots = JSON.parse(window.localStorage.getItem('bots'))

    bots.forEach(function(item, index) {
        if (item.name == botName) {
            pm2.connect(function(err) {
                if (err) {
                    console.error(err)
                }

                let bot = pm2.start({
                    script: 'index.js',
                    name: item.name,
                    cwd: item.path,
                    env: {
                        "DISCORD_TOKEN": secureLocalStorage.getItem(item.name)
                    },

                    output: "/dev/stdout",
                    error: "/dev/stderr",
                })

                pm2.launchBus(function(err, pm2_bus) {
                    pm2_bus.on('log:out', function(packet) {
                        setTerminal([
                            ...terminal,
                            packet.data
                        ])
                    })
                })
            })
        }
    });
}

export const stopBot = (name) => {}