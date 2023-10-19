import { Nav } from "_/components/Nav";
import { routePath as mockupRoutePath } from "_/mockup/routing/routes";
import { routePath } from "_/routing/routes";
import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AboutPage = lazy(() => import("_/pages/About"));
const AccountPage = lazy(() => import("_/pages/Account"));
const GalleryPage = lazy(() => import("_/pages/Gallery"));
const PageNotFound = lazy(() => import("_/pages/NotFound"));

const MockupIndex = lazy(() => import("_/mockup/pages/Index"));
const MockupGallery = lazy(() => import("_/mockup/pages/Gallery"));

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
        path={mockupRoutePath.index()}
        element={
          <Suspense fallback={<Loading />}>
            <MockupIndex />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.gallery()}
        element={
          <Suspense fallback={<Loading />}>
            <MockupGallery />
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
