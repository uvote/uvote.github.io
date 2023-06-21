import { FC } from "react";

import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import { EthereumContextProvider } from "../contexts/Ethereum";

const GalleryPage: FC = () => {
  return (
    <EthereumContextProvider>
      <Nav withConnectWallet />
      <Main />
      <Footer />
    </EthereumContextProvider>
  );
};

export default GalleryPage;
