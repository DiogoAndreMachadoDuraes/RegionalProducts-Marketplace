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
import Cart from "./ui/screens/cart/index";
import Checkout from "./ui/screens/checkout/index";
import InitialPage from "./ui/screens/initialPage/index";
import ProductDetail from "./ui/screens/productDetail/index";
import ClientList from "./ui/screens/clientList/index";
import reportWebVitals from "./reportWebVitals";
import Header from "./ui/components/header";
import { Footer } from "./ui/components/footer";
import Login from "./ui/screens/login/index";
import Invoice from "./ui/screens/invoice/index";
import DashboardProducer from "./ui/screens/dashboardProducer/index";
import DashboardAdmin from "./ui/screens/dashboardAdmin/index";
import ProducerList from "./ui/screens/producerList/index";
import ProducerOrder from "./ui/screens/producerOrder/index";
import FrequentTask from "./ui/screens/frequentTask/index";
import ForgetPassword from "./ui/screens/forgetPassword/index";
import Register from "./ui/screens/register/index";
import ProducerRegister from "./ui/screens/producerRegister/index";
import Home from "./ui/screens/home/index";
import Client from "./ui/screens/client/index";
import Favorites from "./ui/screens/favorites/index";
import Payment from "./ui/screens/payment/index";
import ProductListProducer from "./ui/screens/productListProducer/index";
import ProductList from "./ui/screens/productList/index";
import Terms from "./ui/screens/terms/index";
import Politics from "./ui/screens/politics/index";
import Product from "./ui/screens/product/index";
import Order from "./ui/screens/order/index";
import Confirmation from "./ui/screens/confirmation/index";
import EditProducer from "./ui/screens/editProducer/index";
import EditClient from "./ui/screens/editClient/index";
import Ship from "./ui/screens/ship/index";
import Producer from "./ui/screens/producer/index";
import AboutUs from "./ui/screens/aboutUs/index";
import CreateProduct from "./ui/screens/createProduct/index";
import Avaliation from "./ui/screens/avaliation/index";
import NotFoundPage from "./ui/screens/notFoundPage/index";
import NoPermissions from "./ui/screens/noPermissions/index";

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
          <Route path="/avaliation" component={Avaliation} />
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
