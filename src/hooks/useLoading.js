import { useState, useEffect } from "react";

export const useLoading = (time = 0) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, time);
  };

  useEffect(() => {
    window.addEventListener("load", handleLoading());
    return () => window.removeEventListener("load", handleLoading);
  }, []);

  return isLoading;
};
