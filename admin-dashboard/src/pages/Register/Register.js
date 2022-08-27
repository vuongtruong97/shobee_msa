import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Row,
    Col
} from "reactstrap";
import { useToast } from "hooks";
import { UserService } from "services";
import { HorizontalInput } from "components";
import { TOAST_TYPE } from "constants/global";
import { RESPONSE_CODE } from "constants/global";
import { useHistory } from "react-router-dom";

const schema = yup.object({
    firstName: yup.string()
        .required("First Name is required")
        .min(2, "Please enter a first name with at least 2 characters"),
    lastName: yup.string()
        .required("Last Name is required")
        .min(2, "Please enter a last name with at least 2 characters"),
    email: yup.string()
        .required("Email Address is required")
        .email("Please enter valid Email Address"),
    password: yup.string()
        .required("Password is required")
        .min(6, "Please enter a password with at least 6 characters")
        .max(24, "Please enter a password with a maximum of 24 characters")
});

function Register() {
    const showToast = useToast();
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    const onCreateAccountPressHandler = async (data) => {
        try {
            setLoading(true);
            const response = await UserService.userRegister(data);
            if (response?.code === RESPONSE_CODE.LOGIN_SUCCEEDED) {
                showToast(response?.message, history.push("/auth/login"));
            } else {
                showToast(response?.message, null, TOAST_TYPE.ERROR);
            }
        } catch (error) {
            const message = error?.response ? error?.response?.data?.message : error?.message;
            showToast(message, null, TOAST_TYPE.ERROR);
        }
        setLoading(false);
    };

    return (
        <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-4">
                        <small>Sign up with</small>
                    </div>
                    <div className="text-center">
                        <Button
                            className="btn-neutral btn-icon mr-4"
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
                        <small>Or sign up with credentials</small>
                    </div>
                    <Form role="form">
                        <HorizontalInput
                            control={control}
                            name="firstName"
                            placeholder="First name"
                            type="text"
                            icon={<i className="ni ni-hat-3" />}
                        />
                        <HorizontalInput
                            control={control}
                            name="lastName"
                            placeholder="Last name"
                            type="text"
                            icon={<i className="ni ni-hat-3" />}
                        />
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
                        <Row className="my-4">
                            <Col xs="12">
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                        className="custom-control-input"
                                        id="customCheckRegister"
                                        type="checkbox"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customCheckRegister"
                                    >
                                        <span className="text-muted">
                                            I agree with the{" "}
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                Privacy Policy
                                            </a>
                                        </span>
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button
                                disabled={loading}
                                className="mt-3"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit(onCreateAccountPressHandler)}
                            >
                                Create account
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Register;
