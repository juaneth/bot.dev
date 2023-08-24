import React, { useRef } from 'react';
import * as Store from "../../Store";
import { useNavigate } from "react-router-dom";

import * as Manager from "../../Manager"


export const RemoveBot = ({ htmlFor, botInfo }) => {
    const botName = useRef(0);

    const navigate = useNavigate();

    return (
        <>
            <input type="checkbox" id={htmlFor} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box space-y-2">
                    <h3 className="font-bold text-lg">Are you sure you want to remove {botInfo.name}?</h3>
                    <p className="opacity-50">Type the bots name to confirm</p>

                    <div className="w-full space-y-3">
                        <input id="name" ref={botName} placeholder="Bot Name" className="input w-full bg-neutral" type="text" />
                    </div>

                    <div className="divider"></div>

                    <div className="modal-action">
                        <label htmlFor={htmlFor} className="btn">Cancel</label>
                        <label to={"/bots"} onClick={() => {
                            if (botName.current.value == botInfo.name) {
                                Manager.stopBot(botInfo.name).then(() => {
                                    Store.RemoveBot(botInfo.name)
                                    navigate("/bots")
                                })
                            } else console.log("failed, not the same name")
                        }} htmlFor={htmlFor} className="btn bg-error/80 text-shadow-white">Remove Bot</label>
                    </div>
                </div>
            </div>
        </>

    );
};
