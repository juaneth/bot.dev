const shell = require('electron').shell;

import { ToastElement, activateToast } from '../Components/Toast';

const Home = () => {
  return (
    <div className="content">
      <h1 className="text-2xl mb-5 text-shadow-white">Home</h1>

      <div className='bg-secondary p-4 rounded-lg space-y-2'>
        <h1 className="text-lg">Quick Actions</h1>

        <div className="divider"></div>

        <div className="flex flex-row space-x-3">
          {/* !! Resource Monitor For Later Version !!
           <div className="btn bg-base-100 text-shadow-white">Resource Monitor</div>

            <div className="divider divider-horizontal"></div>
          */}

          <div className="btn bg-base-100 text-shadow-white">New Bot</div>

          <div className="btn bg-base-100 text-shadow-white">Import Bot</div>

          <div className="divider divider-horizontal"></div>

          <div className="btn bg-[#5865F2] hover:bg-[#4c58d3] text-shadow-black" onClick={() => {
            shell.openExternal("https://discord.gg/yNwHH38tmm")

            activateToast("discordToast")
          }}>Join our Discord</div>
        </div>
      </div>

      <ToastElement content={"Discord Invite Opened"} type={"success"} toastId={"discordToast"}></ToastElement>
    </div>
  )
};

export default Home;
