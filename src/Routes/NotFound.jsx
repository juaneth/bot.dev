import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="m-24 text-center">
            <h1 className="text-5xl">404 Error - You seem to be lost.</h1>
            <div className="flex w-full space-x-3 justify-center mt-24">
                <Link className="btn btn-lg w-64" to='/'>Home</Link>
                <Link className="btn btn-lg w-64" to='/bots'>Bots</Link>
                <Link className="btn btn-lg w-64" to='/settings'>Settings</Link>
            </div>
        </div>
    );
};

export default NotFound;
