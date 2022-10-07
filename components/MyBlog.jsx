import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Button, Card, Placeholder } from "react-bootstrap";
import { BlogContext } from "../context/BlogContext";

const MyBlog = ({ item, deleteBlog, loading }) => {
  const router = useRouter();
  const { setBlog } = useContext(BlogContext);
  return loading ? (
    <Placeholder as="div" animation="wave">
      <Placeholder xs={12} style={{ height: 190 }} />
    </Placeholder>
  ) : (
    <Card className="border-0 mb-5">
      <Card.Title style={{ fontWeight: "bold", fontSize: 22 }}>
        {item.title}
      </Card.Title>
      <Card.Text>{item.subtitle}</Card.Text>
      <div className="d-flex gap-2">
        <Button
          onClick={() => {
            setBlog(item);
            router.push("/edit-blog");
          }}
          className="btn-sm"
          variant="outline-success"
        >
          Edit
        </Button>
        <Button
          onClick={() => deleteBlog(item._id)}
          className="btn-sm"
          variant="outline-danger"
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default MyBlog;
