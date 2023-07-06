import { FC } from "react";
import { Column, Columns } from "trunx";

import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Nav } from "../components/Nav";
import { PollCard } from "../components/PollCard";

const polls: { id: string; text: string }[] = [
  {
    id: "xxx",
    text: "Do you want to send weapons to Ukrain?",
  },
];

const GalleryPage: FC = () => {
  return (
    <>
      <Nav showAccountInfo />

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
