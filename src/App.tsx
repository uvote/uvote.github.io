import * as React from "react";
import { createRoot } from "react-dom/client";
import { Navigation } from "./components/navigation";

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(<App />);

function App() {
  return (
    <>
      <Navigation />
    </>
  );
}
