import { useAccount, UseAccountReturnType } from "wagmi";

/**
 * Return wallet address or a nullish address `0x0`.
 *
 * @remarks
 * Generated wagmi hooks that take an address argument will not accept an
 * `undefined` address. On the other hand the `address` returned by `useAccount`
 * may be undefined. That is why this `useMyAddress` hook is needed.
 */
export const useMyAddress = (): NonNullable<
  UseAccountReturnType["address"]
> => {
  const { address } = useAccount();
  return address ?? "0x0";
};
