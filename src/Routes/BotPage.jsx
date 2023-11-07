import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import * as Bots from "../Store";

import { EditBot } from '../Components/BotModals/EditBot.jsx'
import { RemoveBot } from '../Components/BotModals/RemoveBotModal.jsx'
import { Invites } from '../Components/BotModals/Invites.jsx'

import { ToastElement, activateToast } from '../Components/Toast';

import * as Manager from "../Manager"

const storage = window.localStorage

const BotPage = () => {
    const [bots, setBots] = useState(JSON.parse(localStorage.getItem('bots')));

    const [botInfo, setBotInfo] = useState(Array);
    const [isOnline, setIsOnline] = useState(Boolean);
    const [terminal, setTerminal] = useState([]);

    const [stats, setStats] = useState([0, "s"]);

    let id = useParams().id


    useEffect(() => {
        JSON.parse(storage.getItem('bots')).forEach(function (item, index) {
            if (item.name == id) {
                Manager.disconnectBus()

                Manager.botOnline(item.name).then((status) => {
                    setIsOnline(status)
                    Manager.connectBus(item.name, terminal, setTerminal, setStats)
                }).catch(() => {
                    activateToast("NotFound")
                })

                setBotInfo(item)
            }
        });
    }, []);

    if (typeof storage.getItem("defaultCodeEditor") == null) {
        storage.setItem("defaultCodeEditor", "code")
    }

    return (
        <div className="content flex flex-col grow max-h-[calc(100vh_-_4rem)]">
            <EditBot htmlFor={"editBot"} botInfo={botInfo} setBotInfo={setBotInfo}></EditBot>
            <RemoveBot htmlFor={"removeBot"} botInfo={botInfo}></RemoveBot>
            <Invites htmlFor={"invites"} botInfo={botInfo}></Invites>

            <div className="mb-5">
                <h1 className="text-2xl text-shadow-white">{botInfo.name}</h1>
                <p className="text-lg text-white/60">{botInfo.path}</p>
            </div>

            <div className="bg-secondary rounded-lg p-4 flex flex-row space-x-3 mb-5">
                {isOnline ? <div onClick={() => {
                    Manager.stopBot(botInfo.name, terminal, setTerminal).then((response, err) => {
                        setIsOnline(response)
                    })
                }} className="btn text-shadow-white bg-error hover:bg-error/75">
                    Stop
                </div> : <div onClick={() => {
                    Manager.startBot(botInfo.name, terminal, setTerminal).then((response, err) => {
                        setIsOnline(response)
                        Manager.connectBus(botInfo.name, terminal, setTerminal, setStats)
                    }).catch(() => {
                        activateToast("NotFound")
                    })
                }} className="btn text-shadow-white bg-success hover:bg-success/75">
                    Start
                </div>}

                <div data-tip={`Command: ${storage.getItem('defaultCodeEditor')} <bot folder>`} className="tooltip">
                    <div onClick={() => {
                        const { exec } = require('child_process');
                        const openExplorer = require('open-file-explorer');

                        exec(`${storage.getItem('defaultCodeEditor')} ${botInfo.path}`, (err, stdout, stderr) => {
                            if (err) {
                                openExplorer(`${botInfo.path}`, err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                })
                            }
                        });
                    }} className="btn bg-info text-shadow-white hover:bg-info/75">Edit Code</div>
                </div>


                <label htmlFor="invites" className="btn bg-info text-shadow-white hover:bg-info/75">Invites</label>

                <div className="divider divider-horizontal"></div>

                <label htmlFor="editBot" className="btn bg-base-100 text-shadow-white hover:bg-info/75">Edit bot</label>

                <label htmlFor="removeBot" className="btn bg-base-100 text-shadow-white hover:bg-error/75">Remove bot</label>
            </div>

            {isOnline &&
                <div className="flex flex-row max-h-[calc(100vh_-_18.5rem)] space-x-3">
                    <div className="flex flex-col grow h-full max-h-max space-y-3">
                        <div id="terminal" className="transition-all bg-black grow rounded-lg mockup-code max-h-max overflow-x-auto overflow-y-auto">
                            {terminal.map((data, index) => (
                                <pre key={index} data-prefix={index + 1}>
                                    <code>{data}</code>
                                </pre>
                            ))}
                        </div>

                        <div className="grow flex flex-row space-x-3">
                            <code className="w-full"><input className="input w-full bg-black rounded-lg" placeholder="npm i [package name], etc." type="text" /></code>
                            <div className="btn bg-base-100 text-shadow-white hover:bg-white/5">Run</div>
                        </div>


                    </div>

                    <div className="flex flex-col w-64">
                        <div className="stats rounded-lg stats-vertical bg-black">
                            <div className="stat">
                                <div className="stat-title">CPU Usage</div>
                                <div className="stat-value text-2xl"><code>{stats.cpu}%</code></div>
                                <div className="stat-desc"><code>Uptime: {stats.uptime}</code></div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Memory</div>
                                <div className="stat-value text-2xl"><code>{stats.mem} MB</code></div>
                                <div className="stat-desc"><code>Uptime: {stats.uptime}</code></div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <ToastElement content={`Bot Not Found at "${botInfo.path}", Create index.js or edit bot directory`} type={"error"} toastId={"NotFound"}></ToastElement>
        </div >
    );
};

export default BotPage;
