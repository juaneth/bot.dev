import * as Store from "../Store";
import React, { useState } from 'react';

import { Link } from "react-router-dom";
import { ToastElement, activateToast } from '../Components/Toast';

const Bots = () => {
    const [bots, setBots] = useState(JSON.parse(localStorage.getItem('bots')));

    return (
        <div className="content">
            <h1 className="text-2xl mb-5 text-shadow-white">Bots</h1>

            <div className="bg-secondary p-4 rounded-lg">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Path</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {bots.map((bot, index) => (
                            <tr key={index}>
                                <th className="w-12 text-end">{index + 1}</th>
                                <td>{bot.name}</td>
                                <td>{bot.path}</td>
                                <td className="flex justify-end"><Link to={`/bots/${bot.name}`} className="btn btn-info">Manage</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="divider my-2"></div>

                <div className="bg-secondary rounded-lg space-x-3">
                    <div onClick={() => {
                        Store.AddNewBot("Test", "C:/Users/euanw/TestBot", "MTA5NjU4OTA4NDYyNzA1MDU5Nw.Gw0fx9.RxXa1ZKQLJCyprFZ6qXBNb-ycl-Qfd4wxvAjiQ")

                        setBots(JSON.parse(localStorage.getItem('bots')))

                        activateToast("botAddedToast")
                    }} className="btn bg-base-100 text-shadow-white">New Bot</div>

                    <div onClick={() => {
                        Store.RemoveBot("Test")

                        setBots(JSON.parse(localStorage.getItem('bots')))

                        activateToast("botRemovedToast")
                    }} className="btn bg-base-100 text-shadow-white">Import Bot</div>
                </div>
            </div>

            <ToastElement content={"Bot Added Succesfully"} type={"sucess"} toastId={"botAddedToast"}></ToastElement>
            <ToastElement content={"Bot Removed Succesfully"} type={"error"} toastId={"botRemovedToast"}></ToastElement>
        </div>
    )
};

export default Bots;
