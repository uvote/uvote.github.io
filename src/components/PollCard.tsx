import { FC } from "react";
import { Button, Buttons, Card, Content } from "trunx";

type Props = {
  text: string;
};

export const PollCard: FC<Props> = ({ text }) => {
  return (
    <Card
      footer={
        <Buttons>
          <Button size="small">Vote</Button>
        </Buttons>
      }
    >
      <Content>{text}</Content>
    </Card>
  );
};
