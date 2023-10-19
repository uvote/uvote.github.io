import { Footer } from "_/components/Footer";
import { Main } from "_/components/Main";
import { Nav } from "_/components/Nav";
import { PollCard } from "_/components/PollCard";
import { FC } from "react";
import { Column, Columns } from "trunx";

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
