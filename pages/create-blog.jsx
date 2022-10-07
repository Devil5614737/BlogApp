import Container from "../components/Container";
import NavComp from "../components/NavComp";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import { Button, Dropdown, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { request } from "../api/request";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";

export default function CreateBlog() {
  const router = useRouter();
  const [text, setText] = useState();
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const mdParser = new MarkdownIt();

  function handleEditorChange({ html, text }) {
    setText(html, text);
  }

  const uploadPost = async () => {
    setLoading(true);
    if (!category) return toast.error("select a category");
    if (!title) return toast.error("title should not be empty");
    if (!subTitle) return toast.error("subtitle should not be empty");
    const res = await request.post("/create-blog", {
      title,
      content: text,
      image: "",
      category,
      subtitle: subTitle,
    });
    if (res.status === 200)  {
      setLoading(false)
      router.push("/blogs")};
  };

  return (
    <>
      <NavComp />
      <Container>
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
            {category ? category : "Select Category"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {["Programming", "Politics", "Fashion","Other"].map((item) => (
              <Dropdown.Item
                onClick={() => setCategory(item)}
                href="#!"
                key={item}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <FloatingLabel
          controlId="floatingTextarea"
          label="Title"
          className="mb-3"
        >
          <Form.Control
            as="input"
            placeholder="Leave a comment here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Subtitle"
          className="mb-3"
        >
          <Form.Control
            as="input"
            placeholder="Leave a comment here"
            value={subTitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </FloatingLabel>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          placeholder="content"
          allowPasteImage
        />
        <Button
          onClick={uploadPost}
          variant="outline-dark"
          className="w-100 my-4"
        >
          {loading?<Spinner style={{width:18,height:18}} animation="border"/>:"Post"}
        </Button>
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
}
