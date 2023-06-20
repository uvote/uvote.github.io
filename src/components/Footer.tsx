import { FC } from "react";
import { Content } from "trunx";

import { metadata } from "../metadata";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Content>
        <p>{metadata.unicodeName}</p>
        <sub>Made in Italy by yet another GG-team.</sub>
      </Content>
    </footer>
  );
};
