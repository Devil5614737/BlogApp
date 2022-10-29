import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "../components/Container";
import { AuthContext } from "../context/AuthContext";

const NavComp = () => {
  const router=useRouter();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
      <Link href='/blogs'>
      <p style={{ fontWeight: "bold", fontSize: 20, cursor: "pointer" ,color:'#B53471'}}>
          BlogIt
        </p></Link>
        {currentUser ? (
        <div className="d-flex gap-3">
          <Button
            
            variant="outline-dark"
            className="btn-sm "
            onClick={()=>router.push('/create-blog')}
          >
            create blog
          </Button>
          <Button
         onClick={()=>router.push('/my-blogs')}
            variant="outline-dark"
            className="btn-sm "
          >
            My Blogs
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline-dark"
            className="btn-sm "
          >
            Logout
          </Button>
        </div>
        ) : (
          <Button onClick={()=>router.push('/')} variant="outline-dark" className="btn-sm ">
            Login
          </Button>
        )}
      </div>
    </Container>
  );
};

export default NavComp;
