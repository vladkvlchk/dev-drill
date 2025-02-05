import { useState, useEffect } from "react";

export function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };

    updateHeight();
    window.visualViewport?.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
    };
  }, []);

  return viewportHeight;
}
