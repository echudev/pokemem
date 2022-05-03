import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { Game1 } from "../views/Game1";

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Game1" element={<Game1 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;

