export const useEthereum = () => {
  let ethereumIsConnected: boolean | undefined = undefined;
  return {
    ethereumIsConnected,
  };
};
