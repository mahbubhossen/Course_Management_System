import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Course Management`;
  }, [title]);
};

export default useTitle;
