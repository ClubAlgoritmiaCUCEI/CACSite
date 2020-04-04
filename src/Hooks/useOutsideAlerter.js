import { useEffect } from "react";

const useOutsideAlerter = (ref, handlerer = () => null, opener = {}) => {
  const handleClickOutside = event => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      (opener.current ? !opener.current.contains(event.target) : true)
    ) {
      event.stopPropagation();
      handlerer();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};
export default useOutsideAlerter;
