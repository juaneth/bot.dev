import React, { useRef } from 'react';
import * as Store from "../../Store";
import * as Manager from "../../Manager"

import secureLocalStorage from "react-secure-storage";

import { useNavigate } from "react-router-dom";


export const EditBot = ({ htmlFor, botInfo, setBotInfo }) => {
    const botDirectory = useRef(0);
    const botName = useRef(0);
    const clientID = useRef(0);
    const botToken = useRef(0);

    const navigate = useNavigate();

    return (
        <>
            <input type="checkbox" id={htmlFor} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-[42rem] space-y-2">
                    <h3 className="font-bold text-lg">Edit details for {botInfo.name}?</h3>
                    <div className="w-full space-y-3">
                        <div className='space-y-1.5'>
                            <h3>Name:</h3>
                            <input id="name" ref={botName} defaultValue={botInfo.name} placeholder="Bot Name" className="input w-full bg-neutral" type="text" />
                        </div>

                        <div className='space-y-1.5'>
                            <h3>Directory:</h3>
                            <input id="directory" ref={botDirectory} defaultValue={botInfo.path} placeholder="Path to Bot Folder" className="input w-full bg-neutral" type="text" />
                        </div>


                        <div className="divider mx-0"></div>

                        <div className='space-y-1.5'>
                            <h3>Application/Client ID:</h3>
                            <input id="clientID" ref={clientID} defaultValue={botInfo.clientID} placeholder="Application/Client ID" className="input w-full bg-neutral" type="text" />
                        </div>

                        <div className='space-y-1.5'>
                            <h3>Bot Token (leave empty to keep the same):</h3>
                            <div className='flex flex-row space-x-3'>
                                <input id="token" ref={botToken} placeholder="Bot Token (keep private)" className="input w-full bg-neutral" type="password" />
                                <div className="btn bg-[#5865F2] hover:bg-[#4c58d3] text-shadow-black" onClick={() => {
                                    shell.openExternal("https://discord.com/developers/applications")

                                    activateToast("discordToast")
                                }}>Developer Portal</div>
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="modal-action">
                        <label htmlFor={htmlFor} className="btn">Cancel</label>
                        <label onClick={() => {
                            Manager.stopBot(botInfo.name).then(() => {
                                let token = secureLocalStorage.getItem(`${botInfo.name}`)

                                if (botToken.current.value.length == 0) {
                                    Store.AddNewBot(botName.current.value, clientID.current.value, botDirectory.current.value, token)
                                } else {
                                    Store.AddNewBot(botName.current.value, clientID.current.value, botDirectory.current.value, botToken.current.value)
                                }

                                Store.RemoveBot(botInfo.name)

                                let botNewData = { name: botName.current.value, clientID: clientID.current.value, path: botDirectory.current.value, invites: botInfo.invites }

                                setBotInfo(botNewData)

                                document.getElementById('directory').value = ""
                                document.getElementById('name').value = ""
                                document.getElementById('clientID').value = ""
                                document.getElementById('token').value = ""

                                navigate("/")
                            })
                        }} htmlFor={htmlFor} className="btn bg-info/80 text-shadow-white">Update Details</label>
                    </div>
                </div>
            </div>
        </>

    );
};
