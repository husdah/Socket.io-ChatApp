import { Alert, Button, Form, Row, Col, Stack  } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { 
        loginUser, 
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading 
    } = useContext(AuthContext)

    return ( 
        <>
            <Form onSubmit={loginUser}>
                <Row style={{height: '100vh', justifyContent: 'center', paddingTop: '10%'}}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Login</h2>
                            <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}></Form.Control>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}></Form.Control>
                            <Button variant="primary" type="submit">
                                {isLoginLoading ? "Logging in..." : "Login"}
                            </Button>

                            {loginError && <Alert variant="danger"><p>{loginError}</p></Alert>}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </> 
    );
}
 
export default Login;