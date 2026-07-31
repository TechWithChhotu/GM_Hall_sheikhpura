import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Page change hote hi window ko top par bhejo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Ya "smooth" bhi rakh sakte hain
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
