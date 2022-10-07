import Container from "../components/Container";
import NavComp from "../components/NavComp";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useContext, useState } from "react";
import { Button, Dropdown, FloatingLabel, Form, Spinner } from "react-bootstrap";
import {request} from '../api/request';
import { useRouter } from "next/router";
import { BlogContext } from "../context/BlogContext";

export default function CreateBlog() {
  const router=useRouter();
  const { blog } = useContext(BlogContext);
  const [text, setText] = useState();
  const[title,setTitle]=useState(blog?.title);
  const[subTitle,setSubtitle]=useState(blog?.subtitle);
  const[category,setCategory]=useState(blog?.category);
  const[loading,setLoading]=useState(false)


  const mdParser = new MarkdownIt();

  const handleEditorChange=({ html, text })=> {
    setText(html, text);
   
  };







const handleEdit=async()=>{
  setLoading(true)
    const res=await request.put('/edit',{blogId:blog._id, title,subtitle:subTitle, content:text, category });
     if(res.status===200){
      setLoading(false)
         router.push('/blogs')


     }
}



  return (
    <>
      <NavComp />
      <Container>
      <Dropdown className='mb-3'>
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
        {category?category:"Select Category"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
       { ["Programming","Politics","Fashion"].map(item=>
        <Dropdown.Item onClick={()=>setCategory(item)} href="#!" key={item}>{item}</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>

      <FloatingLabel
        controlId="floatingTextarea"
        label="Title"
        className="mb-3"
      >
        <Form.Control as="input" placeholder="Leave a comment here" 
        value={title}
        onChange={e=>setTitle(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Subtitle"
        className="mb-3"
      >
        <Form.Control as="input" placeholder="Leave a comment here" 
        value={subTitle}
        onChange={e=>setSubtitle(e.target.value)}
        />
      </FloatingLabel>
    
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          placeholder='content'
          allowPasteImage
        />
        <Button onClick={handleEdit} variant="outline-dark" className='w-100 my-4'>{
        loading?  <Spinner style={{width:18,height:18}} animation="border"/>:
        "Edit"
        }</Button>
      </Container>
    </>
  );
}
