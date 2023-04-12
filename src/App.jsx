import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="navbar bg-secondary drag">
        <div className="dropdown dropdown-hover no-drag">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content p-2 mt-0 shadow bg-accent/50 backdrop-blur-md rounded-box space-y-1 w-48 no-drag">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/bots"}>Bots</Link></li>
            <li><Link to={"/settings"}>Settings</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">BotDev</a>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
