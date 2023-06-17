import { FC } from "react";
import { EthereumContextProvider } from "../contexts/Ethereum";
import { Nav } from "../components/Nav";

export const GalleryPage: FC = () => {
  return (
    <EthereumContextProvider>
      <Nav />
    </EthereumContextProvider>
  );
};
