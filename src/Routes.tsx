import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import NotFound from "./components/errors/NotFound";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import EnvTest from "./pages/EnvTest";
import Restaurants from "./pages/Restaurants";
import Restaurant from "./pages/Restaurant";
import Payment from "./pages/Payment";
import ManageUser from "./pages/ManageUser";
import RequestResetPwd from "./pages/RequestResetPwd";
import VerifyAccount from "./pages/VerifyAccount";
import ResetPwd from "./pages/ResetPwd";
import ManagerProfile from "./pages/ManagerProfile";
import ManageRestaurant from "./pages/ManageRestaurant";
import ManageIngredients from "./pages/ManageIngredients";
import VaccinationCheck from "./pages/VaccinationCheck";
import Category from "./pages/Category";

export default function Routes() {
    let location = useLocation<any>();
    let background = location.state && location.state.background;
    
    return (
        <div>
            <Switch location={background || location}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/verifyaccount">
                    <VerifyAccount />
                </Route>
                <Route exact path="/restaurants">
                    <Restaurants />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/vaccinationCheck">
                    <VaccinationCheck />
                </Route>
                <Route exact path="/manageuser">
                    <ManageUser />
                </Route>
                <Route exact path="/envtest">
                    <EnvTest />
                </Route>
                <Route path="/restaurant/:id">
                    <Restaurant />
                </Route>
                <Route path="/payment/:id">
                    <Payment />
                </Route>
                <Route exact path="/forgotpassword">
                    <RequestResetPwd />
                </Route>
                <Route exact path="/resetpassword">
                    <ResetPwd />
                </Route>
                <Route exact path="/manager">
                    <ManagerProfile />
                </Route>
                <Route exact path="/managerestaurant">
                    <ManageRestaurant />
                </Route>
                <Route exact path="/manageingredients">
                    <ManageIngredients />
                </Route>
                <Route exact path="/categories">
                    <Category />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>

    );
}