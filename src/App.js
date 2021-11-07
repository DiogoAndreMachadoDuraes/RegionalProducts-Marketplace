import React from "react";
import InitialPage from "./ui/screens/initialPage";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutUs from "./ui/screens/aboutUs";
import Cart from "./ui/screens/cart";
import Checkout from "./ui/screens/checkout";
import Client from "./ui/screens/client";
import ClientList from "./ui/screens/clientList";
import Confirmation from "./ui/screens/confirmation";
import CreateProduct from "./ui/screens/createProduct";
import DashboardAdmin from "./ui/screens/dashboardAdmin";
import DashboardProducer from "./ui/screens/dashboardProducer";
import EditClient from "./ui/screens/editClient";
import EditProducer from "./ui/screens/editProducer";
import Favorites from "./ui/screens/favorites";
import ForgetPassword from "./ui/screens/forgetPassword";
import FrequentTask from "./ui/screens/frequentTask";
import Home from "./ui/screens/home";
import Invoice from "./ui/screens/invoice";
import Login from "./ui/screens/login";
import NoPermissions from "./ui/screens/noPermissions";
import NotFoundPage from "./ui/screens/notFoundPage";
import Order from "./ui/screens/order";
import Payment from "./ui/screens/payment";
import Politics from "./ui/screens/politics";
import Producer from "./ui/screens/producer";
import ProducerList from "./ui/screens/producerList";
import ProducerOrder from "./ui/screens/producerOrder";
import ProducerProfile from "./ui/screens/producerProfile";
import ProducerRegister from "./ui/screens/producerRegister";
import Product from "./ui/screens/product";
import ProductDetail from "./ui/screens/productDetail";
import ProductList from "./ui/screens/productList";
import ProductListProducer from "./ui/screens/productListProducer";
import Register from "./ui/screens/register";
import Ship from "./ui/screens/ship";
import Terms from "./ui/screens/terms";

function App() {
  return (
    <div className="App">
      <AboutUs />
      <Cart />
      <Checkout />
      <Client />
      <ClientList />
      <Confirmation />
      <CreateProduct />
      <DashboardAdmin />
      <DashboardProducer />
      <EditClient />
      <EditProducer />
      <Favorites/>
      <ForgetPassword />
      <FrequentTask />
      <Home />
      <InitialPage />
      <Invoice />
      <Login />
      <NoPermissions />
      <NotFoundPage />
      <Order />
      <Payment />
      <Politics />
      <Producer />
      <ProducerList />
      <ProducerOrder />
      <ProducerProfile />
      <ProducerRegister />
      <Product />
      <ProductDetail />
      <ProductList />
      <ProductListProducer />
      <Register />
      <Ship />
      <Terms />
    </div>
  );
}

export default App;
