const shell = require('electron').shell;

import { ToastElement, activateToast } from '../Components/Toast';
import { AddBot } from "../Components/BotModals/AddBot";

import React, { useState } from 'react';

import { Link } from "react-router-dom";

const Home = () => {
  const [bots, setBots] = useState(JSON.parse(localStorage.getItem('bots')));

  return (
    <div className="content">

      <AddBot htmlFor={"addBot"} bots={bots} setBots={setBots}></AddBot>

      <h1 className="text-2xl mb-5 text-shadow-white">Home</h1>

      <div className='bg-secondary p-4 rounded-lg space-y-2 mb-5'>
        <h1 className="text-lg">Quick Actions</h1>

        <div className="divider"></div>

        <div className="flex flex-row space-x-3">
          <label htmlFor="addBot" className="btn bg-base-100 text-shadow-white">Import Bot</label>

          <div className="btn bg-base-100 text-shadow-white" onClick={() => {
            shell.openExternal("https://discord.com/developers/applications")
          }}>Discord Developer Portal</div>

          <Link className="btn bg-base-100 text-shadow-white" to={"/settings"}>Settings</Link>

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

        {bots.length == 0 ? (
          <>
            <h1 className='p-2'>No Bots Found...</h1>
          </>
        ) : (
          <table className="table w-full border-separate border-spacing-0.5 table-auto">
            <thead>
              <tr>
                <th className='justify-center text-center'>#</th>
                <th>Name</th>
                <th className='grow'>Path</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bots.map((bot, index) => (
                <tr key={index}>
                  <th className="w-12 text-center">{index + 1}</th>
                  <td>{bot.name}</td>
                  <td className='w-full'>{bot.path}</td>
                  <td className="flex justify-center w-min"><Link to={`/bots/${bot.name}`} className="btn btn-info">Manage</Link></td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
      </div>

      <div className='bg-secondary p-4 rounded-lg space-y-2'>
        <h1 className="text-lg">Tutorials</h1>

        <div className="divider"></div>

        <div className='gap-4 flex flex-row flex-wrap'>
          <div className="card bg-base-100">
            <div className="card-body p-6 space-y-0">
              <h2 className="card-title text-lg">Install and Setup</h2>
              <p className='text-sm'>Install and Setup bot.dev desktop app</p>
              <div className="divider"></div>
              <div className="card-actions">
                <button onClick={() => {
                  shell.openExternal("https://github.com/juaneth/bot.dev/wiki/Install-and-Setup")
                }} className="btn bg-base-100 text-shadow-white">Read on GitHub</button>
              </div>
            </div>
          </div>
          {/* # Tutorial Not Finished Yet
            <div className="card bg-base-100">
              <div className="card-body p-6 space-y-0">
                <h2 className="card-title text-lg">Making a Discord Bot</h2>
                <p className='text-sm'>Make a discord.js bot and import it into bot.dev</p>
                <div className="divider"></div>
                <div className="card-actions">
                  <button onClick={() => {
                    shell.openExternal("https://github.com/juaneth/bot.dev/wiki/Making-a-Bot")
                  }} className="btn bg-base-100 text-shadow-white">Read on GitHub</button>
                </div>
              </div>
          </div>
          */
          }


        </div>
      </div>

      <ToastElement content={"Discord Invite Opened"} type={"info"} toastId={"discordToast"}></ToastElement>
      <ToastElement content={"Bot Added Succesfully"} type={"sucess"} toastId={"botAddedToast"}></ToastElement>
    </div>
  )
};

export default Home;
