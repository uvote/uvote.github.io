import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutPage from "../pages/About";
import AccountPage from "../pages/Account";
import GalleryPage from "../pages/Gallery";
import PageNotFound from "../pages/NotFound";
import { routePath } from "./routes";

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routePath.homepage()} Component={GalleryPage} />
      <Route path={routePath.about()} Component={AboutPage} />
      <Route path={routePath.account()} Component={AccountPage} />
      <Route path="*" Component={PageNotFound} />
    </Routes>
  </BrowserRouter>
);
