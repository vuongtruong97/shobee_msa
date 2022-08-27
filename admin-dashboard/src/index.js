import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "react-toastify/dist/ReactToastify.css";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { AdminLayout, AuthLayout } from "layouts";
import store from "store";
import { EditDiscount } from "pages";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
            <ToastContainer />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
