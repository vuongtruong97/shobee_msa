import React from "react";
import { useAuthenticated } from "hooks";
import { Redirect, Route } from "react-router-dom";

function UnauthenticatedRoute(props) {
    const { path, component } = props;
    const isAuthenticated = useAuthenticated();

    return (
        <>
            {!isAuthenticated && (<Route path={path} component={component} />)}
            {isAuthenticated && (<Redirect to="/" />)}
        </>
    );
}

export default UnauthenticatedRoute;
