import React, { useState, useEffect } from 'react';

export const Terminal = ({ botName }) => {
    const [terminal, setTerminal] = useState([]);

    useEffect(() => {

        JSON.parse(localStorage.getItem('bots')).forEach(function (item, index) {
            if (item.name == id) {
                Manager.botOnline(item.name, terminal, setTerminal).then((online) => {
                    Manager.connectBus(item.name, terminal, setTerminal)
                })

                // Refresh online check every 10 seconds
                let interval = setInterval(() => Manager.botOnline(item.name, terminal, setTerminal).then((online) => {
                    item.online = online
                    setBotInfo(item)
                }), 1000);
            }
        });
    }, []);

    return (
        <div id="terminal" className="transition-all grow bg-black mockup-code">
            {terminal.map((data, index) => (
                <pre key={index} data-prefix={index + 1}>
                    <code>{data}</code>
                </pre>
            ))}
        </div>
    );
};
