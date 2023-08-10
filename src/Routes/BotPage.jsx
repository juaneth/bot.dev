import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ManageBot } from "../Store";

import * as Manager from "../Manager"

const BotPage = () => {
    const [botInfo, setBotInfo] = useState(Array);
    const [isOnline, setIsOnline] = useState(Boolean);
    const [terminal, setTerminal] = useState([]);

    let id = useParams().id

    useEffect(() => {
        JSON.parse(localStorage.getItem('bots')).forEach(function (item, index) {
            if (item.name == id) {
                setBotInfo(item)
            }
        });
    }, []);

    return (
        <div className="content flex flex-col grow max-h-[calc(100vh_-_4rem)]">
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
                        Manager.connectBus(botInfo.name, terminal, setTerminal)
                    })
                }} className="btn text-shadow-white bg-success hover:bg-success/75">
                    Start
                </div>}


                <div onClick={() => {

                }} className="btn bg-info hover:bg-info/75 text-shadow-white">Edit</div>

                <div className="divider divider-horizontal"></div>

                <div onClick={() => {

                }} className="btn bg-dark/75 hover:bg-error text-shadow-white">Delete bot</div>
            </div>

            {isOnline &&
                <div id="terminal" className="transition-all bg-black rounded-lg mockup-code max-h-max overflow-y-auto">

                    {terminal.map((data, index) => (
                        <pre key={index} data-prefix={index + 1}>
                            <code>{data}</code>
                        </pre>
                    ))}
                </div>
            }
        </div >
    );
};

export default BotPage;
