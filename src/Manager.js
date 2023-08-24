const pm2 = require('pm2')

import secureLocalStorage from "react-secure-storage";

let currentLog = []

export const botOnline = (botName, terminal, setTerminal) => {
    return new Promise(function(resolve, reject) {
        pm2.describe(botName, ((err, info) => {
            if (info.length > 0) {
                if (info[0].pm2_env.status == "online") {
                    resolve(false)
                }
            }
        }))
    });
}

export const startBot = (botName, terminal, setTerminal) => {
    return new Promise(function(resolve, reject) {
        let bots = JSON.parse(window.localStorage.getItem('bots'))

        let obj = bots[bots.findIndex((o) => o.name === botName)]

        pm2.connect(function(err) {
            if (err) {
                reject(err)
            }

            pm2.start({
                script: 'index.js',
                name: obj.name,
                cwd: obj.path,
                env: {
                    "DISCORD_TOKEN": secureLocalStorage.getItem(obj.name)
                },
            }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                    console.log("STARTED BOT")
                }
            })
        })
    });




}

export const connectBus = (botName, terminal, setTerminal) => {
    return new Promise(function(resolve, reject) {
        let bots = JSON.parse(window.localStorage.getItem('bots'))

        let obj = bots[bots.findIndex((o) => o.name === botName)]

        pm2.connect(function(err) {
            if (err) {
                console.error(err)
            }

            setTerminal(currentLog)

            pm2.launchBus(function(err, pm2_bus) {
                if (err) {
                    console.error(err)
                }

                pm2_bus.on('log:out', function(packet) {
                    if (packet.process.name == obj.name) {
                        currentLog = ([
                            ...currentLog,
                            packet.data
                        ])

                        setTerminal(currentLog)
                    }
                })

                pm2_bus.on('log:err', function(packet) {
                    if (packet.process.name == obj.name) {
                        currentLog = ([
                            ...currentLog,
                            packet.data
                        ])

                        setTerminal(currentLog)
                    }
                })

                resolve(true)
            })
        })
    });
}

export const stopBot = (botName) => {
    return new Promise(function(resolve, reject) {
        let bots = JSON.parse(window.localStorage.getItem('bots'))

        let obj = bots[bots.findIndex((o) => o.name === botName)]

        pm2.connect(function(err, apps) {
            console.log(err, apps)

            pm2.stop(obj.name, (err, apps) => {
                console.log(err, apps)

                currentLog = []

                resolve(false)
            })
        })

        pm2.disconnect()
    });
}