const Settings = () => {
    const storage = window.localStorage

    return (
        <div className="content">
            <h1 className="text-2xl mb-5 text-shadow-white">Settings</h1>

            <div className='bg-secondary p-5 rounded-lg space-y-5'>
                <h1 className="text-xl text-shadow-white">Bot Management</h1>

                <div onClick={() => {
                    storage.setItem(`bots`, JSON.stringify([]))
                }} className="btn bg-error hover:bg-error/75">Clear Bots List</div>
            </div>
        </div>
    )
};

export default Settings;
