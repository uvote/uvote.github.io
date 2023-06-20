import { FC } from "react";
import { createRoot } from "react-dom/client";
import { GalleryPage } from "./pages/Gallery";

const DApp: FC = () => {
  return <GalleryPage />;
};

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(<DApp />);
