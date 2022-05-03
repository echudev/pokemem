import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { Game1 } from "../views/Game1";

function AppRoutes() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Game1" element={<Game1 />} />
      </Routes>
    </HashRouter>
  );
}
export default AppRoutes;

