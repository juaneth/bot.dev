const pm2 = require('pm2')
const fs = require("node:fs")

import path from "node:path";
import secureLocalStorage from "react-secure-storage";

let currentLog = []

let statsInterval;

export const botOnline = (botName) => {
    return new Promise(function(resolve, reject) {
        let bots = JSON.parse(window.localStorage.getItem('bots'))

        let obj = bots[bots.findIndex((o) => o.name === botName)]

        if (obj == undefined) {
            reject("Bot Not Found")
        }

        if (fs.existsSync(`${obj.path}/index.js` || fs.existsSync(`${obj.path}/main.js`))) {
            pm2.connect(function(err) {
                if (err) {
                    reject(err)
                }

                pm2.describe(obj.name, (err, data) => {
                    if (err) {
                        reject(err)
                    }

                    let status = data[0].pm2_env.status

                    if (status == "online") {
                        resolve(true)
                    } else {
                        if (status == "stopped") {
                            resolve(false)
                        }
                    }
                })
            })
        } else {
            reject("Bot Not Found")
        }
    });
}

export const startBot = (botName, terminal, setTerminal) => {
    return new Promise(function(resolve, reject) {
        let bots = JSON.parse(window.localStorage.getItem('bots'))

        let obj = bots[bots.findIndex((o) => o.name === botName)]

        if (fs.existsSync(`${obj.path}/index.js` || fs.existsSync(`${obj.path}/main.js`))) {
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
                    }
                })
            })
        } else {
            reject(`Bot not found at ${obj.path}`)
        }
    });
}

export const disconnectBus = () => {
    return new Promise(function(resolve, reject) {
        currentLog = []

        pm2.disconnect()

        resolve(true)
    });
}

export const connectBus = (botName, terminal, setTerminal, setStats) => {
    return new Promise(function(resolve, reject) {
        let bots = JSON.parse(window.localStorage.getItem('bots'))

        let obj = bots[bots.findIndex((o) => o.name === botName)]

        pm2.connect(function(err) {
            if (err) {
                reject(err)
            }

            setTerminal(currentLog)

            pm2.launchBus(function(err, pm2_bus) {
                if (err) {
                    reject(err)
                }

                if (currentLog.length == 0) {
                    currentLog = ([
                        ...currentLog,
                        "[X] bot.dev Terminal Connected! [X]"
                    ])
                }

                setTerminal(currentLog)

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


                statsInterval = setInterval(() => {
                    pm2.describe(obj.name, (err, data) => {
                        let uptime = [Math.floor(((Date.now() - data[0].pm2_env.pm_uptime) / 1000)), "s"]

                        if (uptime[0] >= 60) {
                            uptime = [Math.floor(uptime[0] / 60), "m"]

                            if (uptime[0] >= 60) {
                                uptime = [Math.floor(uptime[0] / 60), "hrs"]

                                if (uptime[0] >= 24) {
                                    uptime = [Math.floor(uptime[0] / 24), " days"]
                                }
                            }
                        }

                        let monit = {
                            cpu: data[0].monit.cpu,
                            mem: Math.round(data[0].monit.memory / 1000000 * 100) / 100,
                            uptime: uptime
                        }

                        setStats(monit)
                    })
                }, 1500)

                resolve(true)
            })
        })
    });
}

export const stopBot = (botName) => {
    return new Promise(function(resolve, reject) {
        let bots = JSON.parse(window.localStorage.getItem('bots'))

        let obj = bots[bots.findIndex((o) => o.name === botName)]
        pm2.stop(obj.name, (err, apps) => {
            console.log(err, apps)

            currentLog = []

            clearInterval(statsInterval)

            resolve(false)

            pm2.disconnect()
        })
    });
}