import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { ManageBot } from "../Store";
import { ToastElement, activateToast } from '../Components/Toast';

const BotPage = () => {
    const [botInfo, setBotInfo] = useState(0);

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

            <div className="bg-secondary rounded-lg p-4 space-x-3">
                <div onClick={() => {

                }} className="btn bg-success hover:bg-success/75 text-shadow-white">Start</div>

                <div onClick={() => {

                }} className="btn bg-info hover:bg-info/75 text-shadow-white">Edit</div>

                <div className="divider divider-horizontal"></div>


            </div>
        </div>
    );
};

export default BotPage;
