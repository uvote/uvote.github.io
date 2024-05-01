import {
  Box,
  BoxProps,
  CallToAction,
  CallToActionProps,
  Flex,
  Section,
  Title,
} from "_/components/library";
import { classNames } from "_/styles/classNames";
import { FC, PropsWithChildren } from "react";

export type HomeSectionProps = {
  ctaText: string;
  ctaOnClick?: CallToActionProps["onClick"];
  title: string;
} & Pick<BoxProps, "color">;

export const HomeSection: FC<PropsWithChildren<HomeSectionProps>> = ({
  children,
  color,
  ctaOnClick,
  ctaText,
  title,
}) => {
  return (
    <Section>
      <Title className={classNames("has-text-centered")}>{title}</Title>

      <Box color={color}>
        {children}

        <Flex justify="end">
          <CallToAction size="large" onClick={ctaOnClick} text={ctaText} />
        </Flex>
      </Box>
    </Section>
  );
};
