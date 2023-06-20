import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|iPhone|iPad/i));
    setMobile(mobile);
  }, []);

  return { isMobile };
};
