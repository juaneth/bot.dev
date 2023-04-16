const shell = require('electron').shell;

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

            document.getElementById("discordToast").classList.remove("opacity-0")
            setTimeout(() => {
              document.getElementById("discordToast").classList.add("opacity-0")
            }, 10000)
          }}>Join our Discord</div>
        </div>
      </div>

      <div className="toast transition-all opacity-0" id="discordToast">
        <div className="alert px-5 alert-info">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-white text-shadow-white flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-shadow-white text-white">Discord Invite Opened</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
