import React from "react";
import { useLocation, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import routes from "routes.js";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

function Auth() {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.body.classList.add("bg-default");
        return () => {
            document.body.classList.remove("bg-default");
        };
    }, []);

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = () => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <UnauthenticatedRoute
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    return (
        <div className="main-content" ref={mainContent}>
            <div className="header bg-gradient-info py-6 py-lg-7">
                <Container>
                    <div className="header-body text-center mb-7">
                        <Row className="justify-content-center">
                            <Col lg="5" md="6">
                                <h1 className="text-white">Welcome!</h1>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="fill-default"
                            points="2560 0 2560 100 0 100"
                        />
                    </svg>
                </div>
            </div>
            <Container className="mt--9 mb-5">
                <Row className="justify-content-center">
                    <Switch>
                        {getRoutes()}
                        <Redirect from="*" to="/auth/login" />
                    </Switch>
                </Row>
            </Container>
        </div>
    );
};

export default Auth;
