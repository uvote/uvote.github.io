import { FC } from "react";
import { createRoot } from "react-dom/client";
import { ConnectMetaMask } from "./components/ConnectMetaMask";
import { Nav } from "./components/Nav";

const App: FC = () => {
  return (
    <>
      <Nav />

      <ConnectMetaMask />
    </>
  );
};

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(<App />);
