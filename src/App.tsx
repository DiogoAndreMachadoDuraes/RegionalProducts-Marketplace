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
	ClientList,
	ProducerList,
	ProductList,
	ProductPage as Product,
	Order,
	DashboardAdmin,
	DashboardProducer,
	EditClient,
	EditProducer,
	Producer,
	Cart,
	Invoice,
	ProducerOrder,
	ProducerRegister,
	CreateProduct,
	ProductListProducer,
	AdminProfile,
	Favorites,
	Home,
	ProducerProfile,
	Confirmation,
	Payment,
	Ship,
	EditAdmin,
} from 'ui';

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
							<Route exact path="/profile" component={ClientProfile} />
							<Route exact path="/noPermissions" component={NoPermissions} />
							<Route exact path="/termsConditions" component={TermsConditions} />
							<Route exact path="/cookiesPolitics" component={CookiesPolitics} />
							<Route exact path="/privacityPolitics" component={PrivacityPolitics} />
							<Route exact path="/frequentTask" component={FrequentTask} />
							<Route exact path="/productDetail/:id" component={ProductDetail} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/clientList" component={ClientList} />
							<Route exact path="/producerList" component={ProducerList} />
							<Route exact path="/productList" component={ProductList} />
							<Route exact path="/product/:category" component={Product} />
							<Route exact path="/order" component={Order} />
							<Route exact path="/dashboardAdmin" component={DashboardAdmin} />
							<Route exact path="/dashboardProducer" component={DashboardProducer} />
							<Route exact path="/ship" component={Ship} />
							<Route exact path="/payment" component={Payment} />
							<Route exact path="/confirmation" component={Confirmation} />
							<Route exact path="/editClient" component={EditClient} />
							<Route exact path="/editProducer" component={EditProducer} />
							<Route exact path="/producer" component={Producer} />
							<Route exact path="/cart" component={Cart} />
							<Route exact path="/invoice/:id" component={Invoice} />
							<Route exact path="/producerOrder" component={ProducerOrder} />
							<Route exact path="/producerRegister" component={ProducerRegister} />
							<Route exact path="/createProduct" component={CreateProduct} />
							<Route exact path="/productListProducer" component={ProductListProducer} />
							<Route exact path="/favorites" component={Favorites} />
							<Route exact path="/producerProfile" component={ProducerProfile} />
							<Route exact path="/editAdmin" component={EditAdmin} />
							<Route exact path="/adminProfile" component={AdminProfile} />

							<Route component={NotFoundPage} />
						</Switch>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
};
