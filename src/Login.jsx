import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/appointment");
    };

    const mockLogin = (email) => {
        const mockResponses = {
            "admin": {
                message: "Authentication successful",
                token: "sample-jwt-token",
                user: { id: "1", role: "admin" },
            },
            "customer": {
                message: "Authentication successful",
                token: "sample-jwt-token",
                user: { id: "1", role: "customer" },
            }
        };

        return mockResponses[email] || { message: "Invalid credentials" };
    };

    const login = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const response = mockLogin(email);

                if (response.user) {
                    const user = { ...response.user, isLoggedIn: true };
                    const token = response.token;

                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);

                    setUser(user);

                    if (user.role === "admin") {
                        navigate("/schedule");
                    } else if (user.role === "customer") {
                        navigate("/appointment");
                    }
                } else {
                    toast.error("Invalid credentials. Please try again.");
                }
            } catch (error) {
                console.log("Login error:", error);
            }
        } else {
            console.log("Please fill in all fields");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={(e) => login(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
