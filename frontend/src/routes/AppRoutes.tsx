import { BrowserRouter, Routes, Route } from "react-router-dom"; //chamativa do react-router-dom
//import HomePage from "../pages/Home/HomePage";
import EventosPage from "../pages/Eventos/Eventos";
import HomePage from "../pages/Home/Home";
//import PartidasPage from "../pages/Partidas/PartidasPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}