import "./styles/main.scss";

import { FC, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutPage from "./pages/About";
import GalleryPage from "./pages/Gallery";
import PageNotFound from "./pages/NotFound";
import { routePath } from "./routing";

const DApp: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routePath.homepage()} Component={GalleryPage} />
        <Route path={routePath.about()} Component={AboutPage} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </BrowserRouter>
  );
};

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <DApp />
  </StrictMode>
);
