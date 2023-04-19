import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import "./index.css";

import NotFound from "./Routes/NotFound";
import Home from "./Routes/Home.jsx";

import Bots from "./Routes/Bots";
import BotPage from "./Routes/BotPage";
import Settings from "./Routes/Settings";


ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='*' element={<NotFound />} />

        <Route index element={<Home />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/bots/:id" element={<BotPage />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  </HashRouter>
);
