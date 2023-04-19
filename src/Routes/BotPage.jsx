import { useParams, Link } from "react-router-dom";
import React, { useState } from 'react';

import { ManageBot } from "../Store";
import { ToastElement, activateToast } from '../Components/Toast';

const BotPage = () => {
    const [bots, setBots] = useState(JSON.parse(localStorage.getItem('bots')));

    return (
        <div className="content">
            <h1 className="text-2xl mb-5 text-shadow-white">Name: {useParams().id}</h1>
        </div>
    );
};

export default BotPage;
