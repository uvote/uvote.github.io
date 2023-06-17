import detectEthereumProvider from "@metamask/detect-provider";
import { useCallback, useEffect } from "react";

export const useEthereum = () => {
  const detectProvider = useCallback(async () => {
    const provider = await detectEthereumProvider();
    console.log(provider);
  }, []);

  useEffect(() => {
    detectProvider();
  }, []);

  let ethereumIsConnected: boolean | undefined = undefined;
  return {
    ethereumIsConnected,
  };
};
