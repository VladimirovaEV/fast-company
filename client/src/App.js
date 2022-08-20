import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layout/users";
import Login from "./layout/login";
import MainPage from "./layout/mainPage";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layout/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/" exact component={MainPage} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
