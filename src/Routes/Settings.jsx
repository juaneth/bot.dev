import config from "../config.json"

import React, { useRef } from 'react';

const path = require('path')

const fs = require('fs');

const Settings = () => {
    const storage = window.localStorage

    const hardwareAccelerationRef = useRef(config.hardwareAcceleration);
    const autoUpdatesRef = useRef(config.autoUpdates);

    return (
        <div className="content">
            <h1 className="text-2xl mb-5 text-shadow-white">Settings</h1>

            <div className="space-y-5">
                <div className='bg-secondary p-5 rounded-lg space-y-5'>
                    <h1 className="text-xl text-shadow-white">Bot Management</h1>

                    <div onClick={() => {
                        storage.setItem(`bots`, JSON.stringify([]))
                    }} className="btn bg-error hover:bg-error/75">Clear Bots List</div>
                </div>

                <div className='bg-secondary p-5 rounded-lg'>
                    <h1 className="text-xl mb-5 text-shadow-white">Application Settings (requires restart)</h1>

                    <div className="divider py-0 my-2"></div>

                    <div className='bg-secondary rounded-lg space-x-3 flex flex-row'>
                        <h1>Hardware Acceleration</h1>

                        <input onChange={() => {
                            config.hardwareAcceleration = hardwareAccelerationRef.current.checked;
                            fs.writeFileSync(path.join(__dirname.split("\\").slice(0, -1).toString().replaceAll(",", "\\"), 'config.json'), JSON.stringify(config))
                        }} ref={hardwareAccelerationRef} type="checkbox" defaultChecked={config.hardwareAcceleration} className="toggle toggle-sm" />
                    </div>

                    <div className="divider py-0 my-2"></div>

                    <div className='bg-secondary rounded-lg space-x-3 flex flex-row'>
                        <h1>Auto Updates</h1>

                        <input onChange={() => {
                            config.autoUpdates = autoUpdatesRef.current.checked;
                            fs.writeFileSync(path.join(__dirname.split("\\").slice(0, -1).toString().replaceAll(",", "\\"), 'config.json'), JSON.stringify(config))
                        }} ref={autoUpdatesRef} type="checkbox" defaultChecked={config.autoUpdates} className="toggle toggle-sm" />
                    </div>

                    <div className="divider py-0 my-2"></div>
                </div>



                <div className="opacity-50">bot.dev v0.0.3 -- 10/10/23 -- Made by juaneth (https://github.com/juaneth)</div>
            </div>


        </div>
    )
};

export default Settings;
