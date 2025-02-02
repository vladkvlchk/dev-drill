import { useState, useEffect } from "react";

import { BREAKPOINT } from "@/utils/constants";

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= BREAKPOINT.MOBILE_MAX);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  return isMobile;
}
