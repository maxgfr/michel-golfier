import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export function useDimensions(targetRef: any) {
  const getDimensions = useCallback(() => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0,
    };
  }, [targetRef]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    const newDimensions = getDimensions();
    setDimensions((prev) => {
      if (
        prev.width === newDimensions.width &&
        prev.height === newDimensions.height
      ) {
        return prev;
      }
      return newDimensions;
    });
  }, [getDimensions]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [handleResize]);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleResize();
  }, [handleResize]);

  return dimensions;
}
