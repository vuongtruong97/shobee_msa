import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, Form, Row, Col } from "reactstrap";
import { HorizontalInput } from "components";
import { TOAST_TYPE } from "constants/global";
import { UserService } from "services";
import { useLocalStorage } from "hooks";
import { LOCAL_STORAGE } from "constants/global";

const schema = yup.object({
    email: yup
        .string()
        .required("Email Address is required")
        .email("Please enter valid Email Address"),
    password: yup.string().required("Password is required"),
});

function Login() {
    const showToast = useToast();
    const accessTokenStorage = useLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSignInPressHandler = async (data) => {
        try {
            setLoading(true);
            const response = await UserService.userLogin(data);
            console.log(response);
            if (response.success) {
                accessTokenStorage.setValue(response?.token);
                showToast(response?.message, window.location.reload());
            } else {
                showToast(response?.message, null, TOAST_TYPE.ERROR);
            }
        } catch (error) {
            const message = error?.response
                ? error?.response?.data?.message
                : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-3">
                        <small>Sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                        <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <span className="btn-inner--icon">
                                <img
                                    alt="..."
                                    src={
                                        require("../../assets/img/icons/common/github.svg")
                                            .default
                                    }
                                />
                            </span>
                            <span className="btn-inner--text">Github</span>
                        </Button>
                        <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <span className="btn-inner--icon">
                                <img
                                    alt="..."
                                    src={
                                        require("../../assets/img/icons/common/google.svg")
                                            .default
                                    }
                                />
                            </span>
                            <span className="btn-inner--text">Google</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-4">
                    <div className="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                    </div>
                    <Form role="form">
                        <HorizontalInput
                            control={control}
                            name="email"
                            placeholder="Email"
                            type="email"
                            icon={<i className="ni ni-email-83" />}
                        />
                        <HorizontalInput
                            control={control}
                            name="password"
                            placeholder="Password"
                            type="password"
                            icon={<i className="ni ni-lock-circle-open" />}
                        />
                        <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                                className="custom-control-input"
                                id=" customCheckLogin"
                                type="checkbox"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor=" customCheckLogin"
                            >
                                <span className="text-muted">Remember me</span>
                            </label>
                        </div>
                        <div className="text-center">
                            <Button
                                disabled={loading}
                                className="my-4"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit(onSignInPressHandler)}
                            >
                                Sign in
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <Row className="mt-3">
                <Col xs="6">
                    <a
                        className="text-light"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        <small>Forgot password?</small>
                    </a>
                </Col>
                <Col className="text-right" xs="6">
                    <Link className="text-light" to="/auth/register">
                        <small>Create new account</small>
                    </Link>
                </Col>
            </Row>
        </Col>
    );
}

export default Login;
