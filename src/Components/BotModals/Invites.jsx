import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from "react-router-dom";

const shell = require('electron').shell;
const storage = window.localStorage

import { ToastElement, activateToast } from '../Toast.jsx';

export const Invites = ({ htmlFor, botInfo }) => {
    const permsIntRef = useRef(String);

    let id = useParams().id

    const [botInfoState, setBotInfo] = useState(Array)
    const [invites, setInvites] = useState(Array)

    useEffect(() => {
        JSON.parse(storage.getItem('bots')).forEach(function (item, index) {
            if (item.name == id) {
                setBotInfo(item)

                setInvites(item.invites)
            }
        });
    }, []);

    return (
        <>
            <input type="checkbox" id={htmlFor} className="modal-toggle" />
            <div className="modal flex flex-col space-y-5">
                <div className="modal-box max-w-[80rem] space-y-2">
                    <h3 className="font-bold text-lg">Invites</h3>

                    {invites.length == 0 ? (
                        <>
                            <h1 className='p-2'>No Invites Found...</h1>
                        </>
                    ) : (
                        <table className="table border-separate table-auto">
                            <thead>
                                <tr>
                                    <td className='justify-center text-center'>#</td>
                                    <th className='grow'>Link</th>
                                    <th className='justify-center text-center'>Perms Integer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invites.map((invite, index) => (
                                    <tr key={index}>
                                        <td className="w-12 text-center">{index + 1}</td>
                                        <td id={`tooltip-${index}`} className='tooltip transition-all hover:text-white/60' data-tip="Click to copy!" onClick={() => {
                                            navigator.clipboard.writeText(invite.link);

                                            document.getElementById(`tooltip-${index}`).classList.add("opacity-60")

                                            setTimeout(() => {
                                                document.getElementById(`tooltip-${index}`).classList.remove("opacity-60")
                                            }, 200)
                                        }}>{invite.link}</td>
                                        <td className='justify-center text-center'>{invite.perms}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="modal-box max-w-[80rem] space-y-2">
                    <h3 className="font-bold text-lg">Generate Bot Invite</h3>

                    <div className="divider"></div>

                    <div>
                        <h2 className='text-md mb-2'>Permissions Integer</h2>
                        <input id="permsInt" ref={permsIntRef} defaultValue={"8"} placeholder="Permissions Integer" className="input w-full bg-neutral" type="text" />
                        <div className='text-xs mt-2 opacity-70'>default = administrator (8)</div>
                    </div>


                    <div className="divider"></div>

                    <div className="modal-action">
                        <label htmlFor={htmlFor} className="btn">Cancel</label>
                        <label onClick={() => {
                            const link = `https://discord.com/oauth2/authorize?client_id=${botInfoState.clientID}&scope=bot&permissions=${permsIntRef.current.value}`

                            JSON.parse(storage.getItem('bots')).forEach(function (item, index) {
                                if (item.name == id) {
                                    let bots = JSON.parse(storage.getItem('bots'))

                                    let invitesCache = invites

                                    invitesCache.push({
                                        link: `${link}`,
                                        perms: `${permsIntRef.current.value}`
                                    })

                                    setInvites(invitesCache)

                                    item.invites = invitesCache

                                    bots[index] = item

                                    storage.setItem(`bots`, JSON.stringify(bots))

                                    console.log(`Success: Added invite with link: ${link}, And perms: ${permsIntRef.current.value}`)
                                }
                            });
                        }} className="btn bg-info hover:bg-info/70 text-shadow-white">Create Invite</label>
                    </div>
                </div>
            </div>

            <ToastElement content={"Discord Developer Portal Opened"} type={"info"} toastId={"discordToast"}></ToastElement>
        </>

    );
};