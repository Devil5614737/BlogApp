import { request } from "../../api/request";
import NavComp from '../../components/NavComp';
import Container from '../../components/Container';

export const getStaticPaths = async () => {
    const { data } = await request.get("/all-blogs");
  
    const paths = data.map((item) => {
      return {
        params: { blogId: item._id.toString() },
      };
    });
  
    return {
      paths,
      fallback: false,
    };
  };
  
  export const getStaticProps = async (context) => {
    const id = context.params.blogId;
    const { data } = await request.get(`/all-blogs/${id}`);
  
    return {
      props: {
        data,
      },
    };
  }




 const Products=({data})=>{

    return (
      <>
      <NavComp/>
      <Container>
       <div className='my-4'>
       <h1 className="mb-4">{data.title}</h1>
            <div
            className="blog"
           dangerouslySetInnerHTML={{__html: data.content}}
           />
       </div>
         </Container>
      </>
    )
};

export default Products;