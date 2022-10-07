import React, { useContext, useEffect, useState } from "react";

import Container from "../components/Container";
import MyBlog from "../components/MyBlog";
import NavComp from "../components/NavComp";
import { request } from "../api/request";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


const MyBlogs = () => {

  const { currentUser } = useContext(AuthContext);
  const [fetch, setFetch] = useState(false);
  const [myBlogs, setMyBlogs] = useState([]);

  const getBlogs = async () => {
    const { data } = await request.get("/myblog");
    setMyBlogs(data);
  };

  const handleDeleteBlog = async (id) => {
    setFetch(true);
    await request.post("/remove-blog", { blogId: id });
  };

  useEffect(() => {
    getBlogs();
    return () => setFetch(false);
  }, [fetch]);

  return (
    <>
      <NavComp />
      <Container>
        <div className="my-5">
          {myBlogs?.map((item) => (
            <MyBlog key={item._id} deleteBlog={handleDeleteBlog} item={item} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default MyBlogs;




