import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|iPhone|iPad/i));
    setIsMobile(mobile);
  }, []);

  return { isMobile };
};
