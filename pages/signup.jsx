import axios from "axios";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { request } from "../api/request";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    request
      .post("http://localhost:4000/api/signup", { username, email, password,displayPic:username })
      .then((res) => {
        if (res.data) {
          toast.success(" created");
          router.push("/");
        }
      })
      .catch((e) => {
       
        if (e) return toast.error(e.response.data);
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
            <Card.Title>Signup</Card.Title>

            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3 mt-3"
            >
              <Form.Control
                type="username"
                placeholder="name@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FloatingLabel>
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
              onClick={handleSignup}
            >
              Signup
            </Button>
          </Card.Body>
        </Card>
        <Card className="my-4">
          <Card.Body>
            <Card.Text className="text-center">
              Have an account? <Link href="/">Login</Link>
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

export default Signup;
