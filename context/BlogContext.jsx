import { createContext, useState } from "react";

export const BlogContext = createContext(null);

export const BlogContextProvider = ({ children }) => {
  const [blog, setBlog] = useState();
  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
