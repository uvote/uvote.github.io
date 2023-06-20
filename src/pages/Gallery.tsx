import { FC } from "react";
import { EthereumContextProvider } from "../contexts/Ethereum";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { PageContent } from "../components/PageContent";

export const GalleryPage: FC = () => {
  return (
    <EthereumContextProvider>
      <Nav />

      <PageContent />

      <Footer />
    </EthereumContextProvider>
  );
};
