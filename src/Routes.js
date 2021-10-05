import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import NotFound from "./components/errors/NotFound";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EnvTest from "./pages/EnvTest";
import Restaurants from "./pages/Restaurants";
import Restaurant from "./pages/Restaurant";
import LineItem from "./components/LineItem";
import Payment from "./pages/Payment";

export default function Routes() {
    let location = useLocation();
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
                <Route exact path="/restaurants">
                    <Restaurants />
                </Route>
                <Route exact path="/envtest">
                    <EnvTest />
                </Route>
                <Route path="/restaurant/:id" children={<Restaurant />}>
                </Route>
                <Route path="/payment/:id" children={<Payment />}>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            
            {background && <Route path="/restaurant/:id/:foodId" children={<LineItem />} />}
        </div>

    );
}