import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { ManageBot } from "../Store";

import * as Manager from "../Manager"

const BotPage = () => {
    const [botInfo, setBotInfo] = useState(0);
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
        <div className="content">
            <div className="mb-5">
                <h1 className="text-2xl text-shadow-white">{botInfo.name}</h1>
                <p className="text-lg text-white/60">{botInfo.path}</p>
            </div>

            <div className="bg-secondary rounded-lg p-4 space-x-3 mb-5">
                {terminal ? <div onClick={() => {
                    document.getElementById("terminal").classList.remove("opacity-0")

                    Manager.startBot(botInfo.name, terminal, setTerminal)
                }} className="btn text-shadow-white bg-success hover:bg-success/75">
                    Start
                </div> : <div onClick={() => {
                    document.getElementById("terminal").classList.remove("opacity-0")

                    Manager.stopBot(botInfo.name, terminal, setTerminal)
                }} className="btn text-shadow-white bg-error hover:bg-success/75">
                    Stop
                </div>}


                <div onClick={() => {
                    document.getElementById("terminal").classList.add("opacity-0")

                    Manager.stopBot(botInfo.name, terminal, setTerminal)
                }} className="btn bg-info hover:bg-info/75 text-shadow-white">Edit</div>

                <div onClick={() => {

                }} className="btn bg-info hover:bg-info/75 text-shadow-white">Delete bot</div>
            </div>

            <div id="terminal" className="transition-all bg-black rounded-lg mockup-code transition-all opacity-0">
                {terminal.map((data, index) => (
                    <pre key={index} data-prefix={index + 1}>
                        <code>{data}</code>
                    </pre>
                ))}
            </div>
        </div >
    );
};

export default BotPage;
