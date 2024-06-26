import React, { useEffect, useState } from 'react'
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader'
import Home from "./component/Home/Home"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import "./App.css"
import LoginSignUp from './component/User/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from "./component/layout/Header/UserOptions"
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import ProtectedRoute from './component/Route/ProtectedRoute';
import updatePassword from "./component/User/updatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from 'axios';
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard"
import ProductList from "./component/Admin/ProductList"
import NewProduct from './component/Admin/NewProduct';
import updateProduct from './component/Admin/updateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
const App = () => {

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  //  -- Alert connect with stripe using backend ang fecting frontend
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {

    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
    store.dispatch(loadUser())
    getStripeApiKey();
  }, [])


  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:keyword" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/about" component={About} />
          <Route path="/login" component={LoginSignUp} />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/password/update" component={updatePassword} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />




          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
          <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
          <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={updateProduct} />
          <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
          <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
          <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
          <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />

          <Route
            component={
              window.location.pathname === "/process/payment" ? null : NotFound
            }
          />
        </Switch>
        <Footer />
      </Router>

    </>
  )
}

export default App