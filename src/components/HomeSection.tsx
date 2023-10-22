import {
  Box,
  BoxProps,
  CallToAction,
  Flex,
  Section,
  Title,
} from "_/components/library";
import { classNames } from "_/styles/classNames";
import { FC, PropsWithChildren } from "react";

type Props = {
  ctaText: string;
  title: string;
} & Pick<BoxProps, "color">;

export const HomeSection: FC<PropsWithChildren<Props>> = ({
  children,
  color,
  ctaText,
  title,
}) => {
  return (
    <Section>
      <Title className={classNames("has-text-centered")}>{title}</Title>

      <Box color={color}>
        {children}

        <Flex justify="end">
          <CallToAction size="large" text={ctaText} />
        </Flex>
      </Box>
    </Section>
  );
};
