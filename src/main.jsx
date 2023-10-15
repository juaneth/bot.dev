import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import "./index.css";

import NotFound from "./Routes/NotFound";
import Home from "./Routes/Home.jsx";
import BotPage from "./Routes/BotPage";
import Settings from "./Routes/Settings";

const storage = window.localStorage

if (!storage.getItem(`bots`)) {
  storage.setItem(`bots`, JSON.stringify([]))
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='*' element={<NotFound />} />

        <Route index element={<Home />} />
        <Route path="/bots/:id" element={<BotPage />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  </HashRouter>
);
