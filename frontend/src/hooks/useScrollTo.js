import { useNavigate, useLocation } from "react-router-dom";

export const useScrollTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (elementId) => {
    if (location.pathname === "/") {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollToId: elementId } });
    }
  };

  return scrollToSection;
};
