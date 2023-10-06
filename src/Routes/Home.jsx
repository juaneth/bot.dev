const shell = require('electron').shell;

import { ToastElement, activateToast } from '../Components/Toast';

import React, { useState } from 'react';

import { Link } from "react-router-dom";

const Home = () => {
  const [bots, setBots] = useState(JSON.parse(localStorage.getItem('bots')));

  return (
    <div className="content">
      <h1 className="text-2xl mb-5 text-shadow-white">Home</h1>

      <div className='bg-secondary p-4 rounded-lg space-y-2 mb-5'>
        <h1 className="text-lg">Quick Actions</h1>

        <div className="divider"></div>

        <div className="flex flex-row space-x-3">
          {/* !! Resource Monitor For Later Version !!
           <div className="btn bg-base-100 text-shadow-white">Resource Monitor</div>

            <div className="divider divider-horizontal"></div>
          */}

          <Link className="btn bg-base-100 text-shadow-white" to={"/bots"}>Create or View bots</Link>

          <Link className="btn bg-base-100 text-shadow-white" to={"/settings"}>Settings</Link>

          <div className="btn bg-base-100 text-shadow-white" onClick={() => {
            shell.openExternal("https://discord.com/developers/applications")

            activateToast("discordToast")
          }}>Discord Developer Portal</div>

          <div className="divider divider-horizontal"></div>

          <div className="btn bg-[#5865F2] hover:bg-[#4c58d3] text-shadow-black" onClick={() => {
            shell.openExternal("https://discord.gg/yNwHH38tmm")

            activateToast("discordToast")
          }}>Join our Discord</div>
        </div>
      </div>

      <div className='bg-secondary p-4 rounded-lg space-y-2 mb-5 '>
        <h1 className="text-lg">Bots</h1>

        <div className="divider"></div>

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
              {bots &&
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
      </div>

      <div className='bg-secondary p-4 rounded-lg space-y-2'>
        <h1 className="text-lg">Tutorials</h1>

        <div className="divider"></div>


      </div>

      <ToastElement content={"Discord Invite Opened"} type={"info"} toastId={"discordToast"}></ToastElement>
    </div>
  )
};

export default Home;
