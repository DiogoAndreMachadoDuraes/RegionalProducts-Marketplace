import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
	Header,
	AboutUs,
	Footer,
	Login,
	ResetPassword,
	Thanks,
	ClientProfile,
	NotFoundPage,
	NoPermissions,
	TermsConditions,
	CookiesPolitics,
	PrivacityPolitics,
	FrequentTask,
	ProductDetail,
	Register,
} from 'ui';

import Cart from './ui/screens/cart/index';
/* import ProductDetail from './ui/screens/productDetail/index'; */
import ClientList from './ui/screens/clientList/index';
import Invoice from './ui/screens/invoice/index';
import DashboardProducer from './ui/screens/dashboardProducer/index';
import DashboardAdmin from './ui/screens/dashboardAdmin/index';
import ProducerList from './ui/screens/producerList/index';
import ProducerOrder from './ui/screens/producerOrder/index';
/* import Register from './ui/screens/register/index'; */
import ProducerRegister from './ui/screens/producerRegister/index';
import Home from './ui/screens/home/index';
import Favorites from './ui/screens/favorites/index';
import Payment from './ui/screens/payment/index';
import ProductListProducer from './ui/screens/productListProducer/index';
import ProductList from './ui/screens/productList/index';
import Product from './ui/screens/product/index';
import Order from './ui/screens/order/index';
import Confirmation from './ui/screens/confirmation/index';
import EditProducer from './ui/screens/editProducer/index';
import EditClient from './ui/screens/editClient/index';
import Ship from './ui/screens/ship/index';
import Producer from './ui/screens/producer/index';
import CreateProduct from './ui/screens/createProduct/index';

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div style={{ width: '100%', height: '100%' }}>
					<Header />
					<div style={{ height: '100%' }}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={AboutUs} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/thanks" component={Thanks} />
							<Route exact path="/resetPassword" component={ResetPassword} />
							<Route exact path="/profile" component={ClientProfile} />
							<Route exact path="/noPermissions" component={NoPermissions} />
							<Route exact path="/termsConditions" component={TermsConditions} />
							<Route exact path="/cookiesPolitics" component={CookiesPolitics} />
							<Route exact path="/privacityPolitics" component={PrivacityPolitics} />
							<Route exact path="/frequentTask" component={FrequentTask} />
							<Route exact path="/productDetail" component={ProductDetail} />
							<Route exact path="/register" component={Register} />

							<Route exact path="/cart" component={Cart} />
							<Route exact path="/clientlist" component={ClientList} />
							<Route exact path="/dashboardproducer" component={DashboardProducer} />
							<Route exact path="/dashboardadmin" component={DashboardAdmin} />
							<Route exact path="/invoice" component={Invoice} />
							<Route exact path="/producerlist" component={ProducerList} />
							<Route exact path="/producerorder" component={ProducerOrder} />
							<Route exact path="/producerRegister" component={ProducerRegister} />
							<Route exact path="/favorites" component={Favorites} />
							<Route exact path="/productlistproducer" component={ProductListProducer} />
							<Route exact path="/productlist" component={ProductList} />
							<Route exact path="/product" component={Product} />
							<Route exact path="/order" component={Order} />
							<Route exact path="/editproducer" component={EditProducer} />
							<Route exact path="/editclient" component={EditClient} />
							<Route exact path="/producer" component={Producer} />
							<Route exact path="/createproduct" component={CreateProduct} />
							<Route exact path="/payment" component={Payment} />
							<Route exact path="/ship" component={Ship} />
							<Route exact path="/confirmation" component={Confirmation} />
							<Route component={NotFoundPage} />
						</Switch>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
};
