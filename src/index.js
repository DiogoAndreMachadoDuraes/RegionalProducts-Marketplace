import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cart from "./pages/cart/index";
import Checkout from "./pages/checkout/index";
import InitialPage from "./pages/initialPage/index";
import ProductDetail from "./pages/productDetail/index";
import ClientList from "./pages/clientList/index";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/header";
import { Footer } from "./components";
import Login from "./pages/login/index";
import Invoice from "./pages/invoice/index";
import DashboardProducer from "./pages/dashboardProducer/index";
import DashboardAdmin from "./pages/dashboardAdmin/index";
import ProducerList from "./pages/producerList/index";
import ProducerOrder from "./pages/producerOrder/index";
import FrequentTask from "./pages/frequentTask/index";
import ForgetPassword from "./pages/forgetPassword/index";
import Register from "./pages/register/register";
import ProducerRegister from "./pages/producerRegister/producerregister";
import Home from "./pages/home/index";
import Client from "./pages/client/client";
import Favorites from "./pages/favorites/favorites";
import Payment from "./pages/payment/payment";
import ProductListProducer from "./pages/productListProducer/productlistproducer";
import ProductList from "./pages/productList/productlist";
import Terms from "./pages/terms/terms";
import Politics from "./pages/politics/politics";
import Product from "./pages/product/product";
import Order from "./pages/order/order";
import Confirmation from "./pages/confirmation/index";
import EditProducer from "./pages/editProducer/index";
import EditClient from "./pages/editClient/index";
import Ship from "./pages/ship/index";
import Producer from "./pages/producer/index";
import AboutUs from "./pages/aboutUs/index";
import CreateProduct from "./pages/createProduct/createproduct";
import Rate from "./pages/rate/index";
import NotFoundPage from "./pages/notFoundPage/index";
import NoPermissions from "./pages/noPermissions/index";

ReactDOM.render(
  <React.StrictMode>
    <Router forceRefresh>
      <Switch>
        <Route exact path="/" component={InitialPage} />
        <Route path="/login" component={Login} />
        <Route exact path="/notfound" component={NotFoundPage} />
        <Route path="/payment" component={Payment} />
        <Route path="/ship" component={Ship} />
        <Route path="/confirmation" component={Confirmation} />

        <div>
          <Header />
          <Route path="/about" component={AboutUs} />
          <Route path="/cart" component={Cart} />
          <Route path="/rate" component={Rate} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/productdetail" component={ProductDetail} />
          <Route path="/clientlist" component={ClientList} />
          <Route path="/dashboardproducer" component={DashboardProducer} />
          <Route path="/dashboardadmin" component={DashboardAdmin} />
          <Route path="/invoice" component={Invoice} />
          <Route path="/producerlist" component={ProducerList} />
          <Route path="/producerorder" component={ProducerOrder} />
          <Route path="/tasks" component={FrequentTask} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/register" component={Register} />
          <Route path="/producerregister" component={ProducerRegister} />
          <Route path="/home" component={Home} />
          <Route path="/client" component={Client} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/productlistproducer" component={ProductListProducer} />
          <Route path="/productlist" component={ProductList} />
          <Route path="/terms" component={Terms} />
          <Route path="/product" component={Product} />
          <Route path="/order" component={Order} />
          <Route path="/politics" component={Politics} />
          <Route path="/editproducer" component={EditProducer} />
          <Route path="/editclient" component={EditClient} />
          <Route path="/producer" component={Producer} />
          <Route path="/createproduct" component={CreateProduct} />
          <Route path="/nopermissions" component={NoPermissions} />
          <Route path="/notfound" component={NotFoundPage} />
          <Footer />
        </div>
        <Redirect to="/notfound" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
