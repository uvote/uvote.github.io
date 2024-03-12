import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile = Boolean(
      window.navigator.userAgent.match(/Android|iPhone|iPad/i)
    );
    setIsMobile(isMobile);
  }, []);

  return { isMobile };
};
