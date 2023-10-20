import { Box, CallToAction, Flex, Section, Title } from "_/components/library";
import { classNames } from "_/styles/classNames";
import { FC, PropsWithChildren } from "react";

type Props = {
  ctaText: string;
  title: string;
};

export const HomeSection: FC<PropsWithChildren<Props>> = ({
  children,
  ctaText,
  title,
}) => {
  return (
    <Section>
      <Title className={classNames("has-text-centered")}>{title}</Title>

      <Box>
        {children}

        <Flex justify="end">
          <CallToAction text={ctaText} />
        </Flex>
      </Box>
    </Section>
  );
};
