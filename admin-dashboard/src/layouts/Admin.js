import React from "react";
import { useLocation, Switch, Redirect } from "react-router-dom";
import { Sidebar, AdminNavbar } from "components";

import routes from "routes.js";
import AuthenticatedRoute from "./AuthenticatedRoute";

function Admin(props) {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = () => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <AuthenticatedRoute
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

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            const url = route.layout + route.path;
            if (path.indexOf(url) !== -1) return route.name;
        }
        return "Brand";
    };

    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/admin/dashboard",
                    imgSrc: require("../assets/img/brand/argon-react.png")
                        .default,
                    imgAlt: "...",
                }}
            />
            <div className="main-content mb-4" ref={mainContent}>
                <AdminNavbar
                    {...props}
                    brandText={getBrandText(props.location.pathname)}
                />
                <Switch>
                    {getRoutes()}
                    <Redirect from="*" to="/admin/dashboard" />
                </Switch>
            </div>
        </>
    );
}

export default Admin;
