import { FC } from "react";
import { Column, Columns } from "trunx";

import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import { PollCard } from "../components/PollCard";

const polls: { id: string; text: string }[] = [
  {
    id: "xxx",
    text: "Will you partecipate to web3 revolution?",
  },
];

const GalleryPage: FC = () => {
  return (
    <>
      <Nav showAccount />

      <Main>
        <Columns>
          {polls.map(({ id, text }) => (
            <Column key={id} size="one-third">
              <PollCard text={text} />
            </Column>
          ))}
        </Columns>
      </Main>

      <Footer />
    </>
  );
};

export default GalleryPage;
