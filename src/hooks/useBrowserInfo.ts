"use client";

import { useEffect, useState } from "react";
import Bowser from "bowser";

export const useBrowserInfo = () => {
  const [browser, setBrowser] = useState<string | null>(null);

  useEffect(() => {
    const browserInfo = Bowser.getParser(window.navigator.userAgent);
    setBrowser(browserInfo.getBrowserName());
  }, []);

  return browser;
};
