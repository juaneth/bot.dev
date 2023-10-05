import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';

const Layout = () => {
  const [route, setRoute] = useState(0);

  let location = useLocation().pathname

  useEffect(() => {
    setRoute(location)
  })

  let navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <div className="navbar h-16 bg-secondary drag transition">
        <div className="dropdown dropdown-hover no-drag">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content m-0 shadow bg-accent/50 backdrop-blur-md rounded-box w-48 no-drag">
            <li><Link className="py-3" to={"/"}>Home</Link></li>
            <li><Link className="py-3" to={"/bots"}>Bots</Link></li>
            <li><Link className="py-3" to={"/settings"}>Settings</Link></li>
          </ul>
        </div>

        <a className="btn btn-ghost normal-case text-xl text-shadow-white">bot.dev</a>

        <p className="opacity-50">v0.0.2</p>

        {route !== "/" &&
          <div onClick={() => navigate(-1)} className="btn btn-ghost ml-5 no-drag">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="white" viewBox="0 96 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M655 976 255 576l400-400 56 57-343 343 343 343-56 57Z" /></svg>
          </div>
        }
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
