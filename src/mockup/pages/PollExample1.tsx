import { Footer } from "_/components/Footer";
import { Main } from "_/components/library";
import { ConnectionBar } from "_/mockup/components/ConnectionBar";
import { FC } from "react";

const PollExample1Page: FC = () => {
  return (
    <>
      <ConnectionBar />

      <Main>
        <p>
          {`Sei d’accordo nel stanziare fondi per beni o servizi richiesti dai consumatori e dal mercato economico modificato per i l'ultima volta il 2 gen 2021 alle 00:53 richiesti re fondi per beni o servizi richiesti consumatori e dal mercato? Stanziare fondi`}
        </p>
      </Main>

      <Footer />
    </>
  );
};

export default PollExample1Page;
