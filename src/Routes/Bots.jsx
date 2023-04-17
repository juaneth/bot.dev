import { AddNewBot, RemoveBot } from "../Store";

const Bots = () => {
    let bots = JSON.parse(window.localStorage.getItem('bots'))

    console.log(bots)

    return (
        <div className="content">
            <h1 className="text-2xl mb-5 text-shadow-white">Bots</h1>

            <div className="bg-secondary p-4 mt-3 rounded-lg space-x-3">
                <div onClick={() => {
                    console.log(AddNewBot("Test", "C:/Users/euanw/TestBot"))
                }} className="btn bg-base-100 text-shadow-white">Create Test Bot</div>

                <div onClick={() => {
                    console.log(RemoveBot("Test"))
                }} className="btn bg-base-100 text-shadow-white">Remove Test Bot</div>
            </div>
        </div>
    )
};

export default Bots;
