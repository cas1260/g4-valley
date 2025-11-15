
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./App.tsx";
import { StatisticsPage } from './pages/StatisticsPage.tsx';
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/novidades">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/statics" element={<StatisticsPage />} />
    </Routes>
  </BrowserRouter>
);
  