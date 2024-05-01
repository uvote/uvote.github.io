import { FC, ReactNode, SVGAttributes } from "react";

export const iconNames = ["back", "next"] as const;
type IconName = (typeof iconNames)[number];

type IconDefinition = {
  jsx: ReactNode;
  viewBox: SVGAttributes<SVGSVGElement>["viewBox"];
};

const iconRecord: Record<IconName, IconDefinition> = {
  back: {
    jsx: (
      <path
        d="M2.85713 17.3846C1.84112 16.8852 1.84112 15.4642 2.85712 14.9648L29.9943 1.6257C30.9129 1.17417 31.9951 1.8286 31.9951 2.83562L31.9951 29.5138C31.9951 30.5208 30.9129 31.1752 29.9943 30.7237L2.85713 17.3846Z"
        fill="currentColor"
      />
    ),
    viewBox: "0 0 32 32",
  },
  next: {
    jsx: (
      <path
        d="M29.1429 14.6154C30.1589 15.1148 30.1589 16.5358 29.1429 17.0352L2.00567 30.3743C1.08708 30.8258 0.00488277 30.1714 0.00488281 29.1644L0.004884 2.48623C0.00488405 1.4792 1.08708 0.824778 2.00567 1.27631L29.1429 14.6154Z"
        fill="currentColor"
      />
    ),
    viewBox: "0 0 32 32",
  },
};

type IconProps = Pick<SVGAttributes<SVGSVGElement>, "onClick"> & {
  name: IconName;
  /**
   * Icon `size` can be a number to represent pixel units, or a string to
   * represent em or rem units.
   */
  size?: number | `${number}em` | `${number}rem`;
};

export const Icon: FC<IconProps> = ({ name, onClick, size = "1em" }) => {
  const { viewBox, jsx } = iconRecord[name];

  const className = onClick ? "cursor-pointer" : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      {jsx}
    </svg>
  );
};
