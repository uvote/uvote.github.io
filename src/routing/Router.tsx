import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Nav } from "../components/Nav";
import { routePath as mockupRoutePath } from "../mockup/routing/routes";
import { routePath } from "./routes";

const AboutPage = lazy(() => import("../pages/About"));
const AccountPage = lazy(() => import("../pages/Account"));
const GalleryPage = lazy(() => import("../pages/Gallery"));
const PageNotFound = lazy(() => import("../pages/NotFound"));

const Loading: FC = () => <Nav />;

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routePath.homepage()}
        element={
          <Suspense fallback={<Loading />}>
            <GalleryPage />
          </Suspense>
        }
      />

      <Route
        path={routePath.about()}
        element={
          <Suspense fallback={<Loading />}>
            <AboutPage />
          </Suspense>
        }
      />

      <Route
        path={routePath.account()}
        element={
          <Suspense fallback={<Loading />}>
            <AccountPage />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.homepage()}
        element={
          <Suspense fallback={<Loading />}>
            <GalleryPage />
          </Suspense>
        }
      />

      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <PageNotFound />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);
