import React, { useContext, useEffect, useState } from "react";
import NavComp from "../../components/NavComp";
import Container from "../../components/Container";
import { SearchBox } from "../../components/SearchBox";
import { Blog } from "../../components/Blog";
import { request } from "../../api/request";
import { AuthContext } from "../../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";

const Blogs = ({ data }) => {
  const { currentUser } = useContext(AuthContext);
  const [blogs, setBlogs] = useState(data);
  const [query, setQuery] = useState("");

  const filtered = blogs.filter((item) => {
    if (query === "") {
      return item;
    } else if (item.title.toLowerCase().includes(query.toLowerCase())) {
      return item;
    }
  });

  useEffect(() => {
    if(currentUser){
      toast.success(`welcome @${currentUser?.username}`);

    }
  }, [currentUser?.username]);

  return (
    <>
      <NavComp />
      <Container>
        <SearchBox query={query} setQuery={setQuery} />
        <div className="mt-3">
          {filtered?.map((item) => (
            <Blog
              key={item._id}
              title={item.title}
              content={item.subtitle}
              username={item.postedBy.username}
              id={item._id}
              category={item.category}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      </Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
        }}
      />
    </>
  );
};

export default Blogs;

export async function getServerSideProps() {
  const { data } = await request.get("/all-blogs");
  return {
    props: { data },
  };
}
