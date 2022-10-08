import React, { useEffect, useState } from "react";

import Container from "../../components/Container";
import MyBlog from "../../components/MyBlog";
import NavComp from "../../components/NavComp";
import { request } from "../../api/request";



const MyBlogs = () => {


  const [fetch, setFetch] = useState(false);
  const [myBlogs, setMyBlogs] = useState([]);
  const[loading,setLoading]=useState(false)

  const getBlogs = async () => {
    setLoading(true)
    const { data } = await request.get("/myblog");
    setMyBlogs(data);
    if(data){
      setLoading(false)
    }
  };



  const handleDeleteBlog = async (id) => {
setFetch(true)
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
            <MyBlog key={item._id} deleteBlog={handleDeleteBlog} item={item} loading={loading}/>
          ))}
        </div>
      </Container>
    </>
  );
};

export default MyBlogs;




