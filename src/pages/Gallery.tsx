import { FC } from "react";

import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { PageContent } from "../components/PageContent";
import { EthereumContextProvider } from "../contexts/Ethereum";

export const GalleryPage: FC = () => {
  return (
    <EthereumContextProvider>
      <Nav />
      <PageContent />
      <Footer />
    </EthereumContextProvider>
  );
};
