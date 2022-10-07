import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import formatDistanceToNow from "date-fns/formatDistanceToNow";


export const Blog = ({title,content,username,id,category,createdAt}) => {


  return (
    <Card style={{ border: "none", marginBottom: 35 }}>
     <Link href={'/blogs/'+id}>
     <Card.Title 
      className='blog-title' style={{ fontWeight: "bold", fontSize: 33 }}>
      {title}
      </Card.Title>
     </Link>
      
      <Card.Subtitle className="mt-1 mb-1" style={{ color: "grey" }}>
      {formatDistanceToNow(new Date(createdAt),{addSuffix:true})}
      </Card.Subtitle>
      <Card.Subtitle className='my-1'>by @{username}</Card.Subtitle>HV
      <Card.Text
        className="blog-category p-1 px-2"
        style={{
          border: "1px solid #B53471",
          width: "fit-content",
          borderRadius: 5,
        }}
      >
        {category}
      </Card.Text>
      <Card.Text>
       {content.substr(0,140)+ "..."}
      </Card.Text>
      <Link href={'/blogs/'+id} style={{ cursor: "pointer" }}>Read more</Link>
    </Card>
  );
};



