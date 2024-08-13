import { useState, useEffect } from "react";

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

function useWindowSize(): WindowSize {
  // Initialize state with undefined width/height so server-side rendering does not throw errors
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Function to update window size
    const handleResize = () => {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setWindowSize(size);
      sessionStorage.setItem("windowSize", JSON.stringify(size));
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
