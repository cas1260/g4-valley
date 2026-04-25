
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./App.tsx";
import { StatisticsPage } from './pages/StatisticsPage.tsx';
import "./index.css";

function getRouterBaseName() {
  const modulePath = new URL(import.meta.url).pathname;
  const basePath = modulePath.replace(/\/assets\/[^/]+$/, '');

  return !basePath || basePath === '/' || basePath === modulePath ? undefined : basePath.replace(/\/$/, '');
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={getRouterBaseName()}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/statics" element={<StatisticsPage />} />
      <Route path="/novidades" element={<App />} />
      <Route path="/novidades/statics" element={<StatisticsPage />} />
    </Routes>
  </BrowserRouter>
);
  
