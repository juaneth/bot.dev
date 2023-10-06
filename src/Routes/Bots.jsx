import React, { useState } from 'react';

import { Link } from "react-router-dom";
import { ToastElement, activateToast } from '../Components/Toast';
import { AddBot } from "../Components/BotModals/AddBot";

const Bots = () => {
    const [bots, setBots] = useState(JSON.parse(localStorage.getItem('bots')));

    require("dotenv").config()

    return (
        <div className="content">

            <AddBot htmlFor={"addBot"} bots={bots} setBots={setBots}></AddBot>

            <h1 className="text-2xl mb-5 text-shadow-white">Bots</h1>

            <div className="bg-secondary p-4 rounded-lg space-y-3">
                {bots &&
                    <table className="table w-full border-separate border-spacing-0.5 table-auto">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th className='grow'>Path</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bots.map((bot, index) => (
                                    <tr key={index}>
                                        <th className="w-12 text-center">{index + 1}</th>
                                        <td>{bot.name}</td>
                                        <td className='w-full'>{bot.path}</td>
                                        <td className="flex justify-center w-min"><Link to={`/bots/${bot.name}`} className="btn btn-info">Manage</Link></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                }

                <div className="bg-secondary rounded-lg space-x-3">
                    <label htmlFor="addBot" className="btn bg-base-100 text-shadow-white">Import Bot</label>
                </div>
            </div>

            <ToastElement content={"Bot Added Succesfully"} type={"sucess"} toastId={"botAddedToast"}></ToastElement>
        </div>
    )
};

export default Bots;
