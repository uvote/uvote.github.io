import { Nav } from "_/components/Nav";
import { routePath as mockupRoutePath } from "_/mockup/routing/routes";
import { routePath } from "_/routing/routes";
import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const About = lazy(() => import("_/pages/About"));
const Account = lazy(() => import("_/pages/Account"));
const Home = lazy(() => import("_/pages/Home"));
const NotFound = lazy(() => import("_/pages/NotFound"));

// Mockup s.
const MockupIndex = lazy(() => import("_/mockup/pages/Index"));
const MockupHome = lazy(() => import("_/mockup/pages/Home"));
const MockupCreatePoll = lazy(() => import("_/mockup/pages/CreatePoll"));

const Loading: FC = () => <Nav />;

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routePath.home}
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path={routePath.about}
        element={
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        }
      />

      <Route
        path={routePath.account}
        element={
          <Suspense fallback={<Loading />}>
            <Account />
          </Suspense>
        }
      />

      {/* Mockup routes. */}

      <Route
        path={mockupRoutePath.index}
        element={
          <Suspense fallback={<Loading />}>
            <MockupIndex />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.home}
        element={
          <Suspense fallback={<Loading />}>
            <MockupHome />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.createPoll}
        element={
          <Suspense fallback={<Loading />}>
            <MockupCreatePoll />
          </Suspense>
        }
      />

      {/*  not found. */}

      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);
