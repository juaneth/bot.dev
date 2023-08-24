import React, { useRef } from 'react';
import * as Store from "../../Store";

export const AddBot = ({ htmlFor, bots, setBots }) => {
    const botDirectory = useRef(0);
    const botName = useRef(0);
    const botToken = useRef(0);

    return (
        <>
            <input type="checkbox" id={htmlFor} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box space-y-2">
                    <h3 className="font-bold text-lg">Add Bot from Folder</h3>
                    <p className="opacity-50">(Creating bots directly in bot.dev coming soon)</p>

                    <div className="w-full space-y-3">
                        <input id="name" ref={botName} placeholder="Bot Name" className="input w-full bg-neutral" type="text" />
                        <input id="directory" ref={botDirectory} placeholder="Path to Bot Folder" className="input w-full bg-neutral" type="text" />
                        <input id="token" ref={botToken} placeholder="Bot Token (keep private)" className="input w-full bg-neutral" type="password" />
                    </div>

                    <div className="divider"></div>

                    <div className="modal-action">
                        <label htmlFor={htmlFor} className="btn">Cancel</label>
                        <label onClick={() => {
                            Store.AddNewBot(botName.current.value, botDirectory.current.value, botToken.current.value)

                            setBots(JSON.parse(localStorage.getItem('bots')))

                            document.getElementById('directory').value = ""
                            document.getElementById('name').value = ""
                        }} htmlFor={htmlFor} className="btn bg-info">Add Bot</label>
                    </div>
                </div>
            </div>
        </>

    );
};
