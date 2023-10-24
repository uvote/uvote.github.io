import { ConnectionBar } from "_/components/ConnectionBar";
import { Footer } from "_/components/Footer";
import { Main } from "_/components/library";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <ConnectionBar />
      <Main />
      <Footer />
    </>
  );
};

export default HomePage;
