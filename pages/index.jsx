import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Button, Card, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { request } from "../api/request";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true)
    const res = await request
      .post("/login", { email, password })
      .then((res) => {
        if (res.data) {
          setLoading(false)
          localStorage.setItem("token", res.data);
          const decoded = jwtDecode(res.data);
          setCurrentUser(decoded);
          router.push("/blogs");
        }
      })
      .catch((e) => {
        setLoading(false)
        if (e) return toast.error("invalid credentials");
      });
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "grid",
          placeContent: "center",
        }}
        className="px-3"
      >
        <Card style={{ width: "22rem" }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>

            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 mt-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button
              className="w-100 mt-4"
              variant="outline-dark"
              onClick={handleLogin}
            >
              {loading?<Spinner style={{width:18,height:18}} animation="border"/>:"Login"}
            </Button>
          </Card.Body>
        </Card>
        <Card className="my-4">
          <Card.Body>
            <Card.Text className="text-center">
              Don't have an account? <Link href={"/signup"}>Signup</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
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

export default Login;
