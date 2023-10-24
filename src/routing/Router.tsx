import { TopBar } from "_/components/library";
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
const MockupConnectedAccount = lazy(
  () => import("_/mockup/pages/ConnectedAccount")
);
const MockupCreatePoll = lazy(() => import("_/mockup/pages/CreatePoll"));
const MockupListPolls = lazy(() => import("_/mockup/pages/ListPolls"));
const MockupMyPolls = lazy(() => import("_/mockup/pages/MyPolls"));
const MockupPollExample1 = lazy(() => import("_/mockup/pages/PollExample1"));

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routePath.home}
        element={
          <Suspense fallback={<TopBar />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path={routePath.about}
        element={
          <Suspense fallback={<TopBar />}>
            <About />
          </Suspense>
        }
      />

      <Route
        path={routePath.account}
        element={
          <Suspense fallback={<TopBar />}>
            <Account />
          </Suspense>
        }
      />

      {/* Mockup routes. */}

      <Route
        path={mockupRoutePath.index}
        element={
          <Suspense fallback={<TopBar />}>
            <MockupIndex />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.home}
        element={
          <Suspense fallback={<TopBar />}>
            <MockupHome />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.connectedAccount}
        element={
          <Suspense fallback={<TopBar />}>
            <MockupConnectedAccount />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.createPoll}
        element={
          <Suspense fallback={<TopBar color="primary-b" />}>
            <MockupCreatePoll />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.listPolls}
        element={
          <Suspense fallback={<TopBar color="primary-d" />}>
            <MockupListPolls />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.myPolls}
        element={
          <Suspense fallback={<TopBar color="primary-c" />}>
            <MockupMyPolls />
          </Suspense>
        }
      />

      <Route
        path={mockupRoutePath.pollExample1}
        element={
          <Suspense fallback={<TopBar />}>
            <MockupPollExample1 />
          </Suspense>
        }
      />

      {/*  not found. */}

      <Route
        path="*"
        element={
          <Suspense fallback={<TopBar />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);
