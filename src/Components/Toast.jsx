export const ToastElement = ({ content, type, toastId }) => {
    return (
        <div className="toast transition-all opacity-0 absolute" id={toastId}>
            <div className={`alert px-5 bg-${type}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-white text-shadow-white flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-shadow-white text-white">{content}</span>
                </div>
            </div>
        </div>
    );
};

export const activateToast = (id) => {
    document.getElementById(id).classList.remove("opacity-0")

    setTimeout(() => {
        document.getElementById(id).classList.add("opacity-0")
    }, 10000)
}